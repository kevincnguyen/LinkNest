import { useState, useEffect } from "react"

import useAuth from "../hooks/useAuth"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import usersService from '../services/users'
import Notification from '../components/Notification'
import ProfilePicture from "../components/ProfilePicture"
import Default from '../assets/default.png'

const Appearance = () => {
    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState('')
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        setTitle(auth.user.title)
        if (auth.user.bio) {
            setBio(auth.user.bio)   
        }
        if (image !== auth.user.profilepic) {
            const getProfilePic = async () => {
                try {
                    const response = await usersService.getProfilePic(auth.user.username)
                    setImage(URL.createObjectURL(response) || Default)
                } catch (err) {
                    console.error('error: ', err)
                    if (!err.response) {
                        setMessage('No server response')
                    } else {
                        setMessage('Unable to load profile picture. Please try again.')
                    }
                }
            }
            getProfilePic()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user.title, auth.user.bio, auth.user.profilepic])

    const handleSave = async (event) => {
        event.preventDefault()
        try {
            if (!title) {
                setMessage('Missing required field(s): title')
            } else {
                let updatedUser;
                if (file) {
                    const formData = new FormData();
                    formData.append("title", title);
                    formData.append("bio", bio);
                    formData.append("profilepic", file);
                    updatedUser = await usersService.upload(auth.user.id, formData, axiosPrivate)
                } else {
                    updatedUser = await usersService.update(auth.user.id, { 
                        title, bio
                    }, axiosPrivate)
                }
                setAuth({ user: updatedUser, accessToken: auth.accessToken})
                setMessage('Profile successfully updated')
            }
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
                setMessage('No server response')
            } else {
                setMessage('Invalid inputs. Please try again.')
            }
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleFileUpload = (event) => { 
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setImage(fileReader.result)
        }
        fileReader.readAsDataURL(event.target.files[0])
        setFile(event.target.files[0])
    }

    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={handleSave} encType='multipart/form-data'>
                <label htmlFor='profilepic'>
                    <ProfilePicture src={image}/>
                </label>
                <input 
                    type='file'
                    id='profilepic'
                    name='profilepic'
                    accept='image/jpeg, image/jpg, image/png'
                    onChange={handleFileUpload}
                />
                <br />
                <label htmlFor='title'>Profile Title:</label>
                <input 
                    type='text'
                    value={title}
                    id='title'
                    name='Title'
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete='off'
                    required
                />
                <br />
                <label htmlFor='bio'>Bio:</label>
                <input 
                    type='text'
                    value={bio}
                    id='bio'
                    name='Bio'
                    onChange={(e) => setBio(e.target.value)}
                    autoComplete='off'
                />
                <br />
                <button type='submit'>
                    Save changes
                </button>
            </form>
            <Notification message={message} />
        </>
    )
}

export default Appearance