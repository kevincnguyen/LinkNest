import { useState, useEffect } from "react"

import useAuth from "../hooks/useAuth"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import usersService from '../services/users'
import Notification from '../components/Notification'
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
        const getProfilePic = async () => {
            const response = await usersService.getProfilePic(auth.user.profilepic)
            setImage(URL.createObjectURL(response) || Default)
        }
        getProfilePic()
    }, [auth.user.title, auth.user.bio, auth.user.profilepic])

    const handleSave = async (event) => {
        event.preventDefault()
        try {
            if (!title || !file) {
                setMessage('Missing required field(s)')
            } else {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("bio", bio);
                formData.append("profilepic", file);
                const updatedUser = await usersService.upload(auth.user.id, formData, axiosPrivate)
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
                    <img
                        src={image}
                        alt='Profile Picture'
                        style={{ width: '40%' }}
                    />
                </label>
                <input 
                    type='file'
                    id='profilepic'
                    name='profilepic'
                    accept='image/jpeg, image/jpg, image/png'
                    onChange={handleFileUpload}
                    required
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