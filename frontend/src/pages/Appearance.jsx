import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import useAuth from "../hooks/useAuth"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import usersService from '../services/users'
import { PreviewContext } from '../context/PreviewContext'

import ProfilePicture from "../components/ProfilePicture"
import UnableLoad from '../components/messages/UnableLoad'
import NoServerResponse from '../components/messages/NoServerResponse'
import InvalidCredentials from "../components/messages/InvalidCredentials"
import PhonePreview from "../components/preview/PhonePreview"

const Appearance = () => {
    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)

    useEffect(() => {
        setTitle(auth.user.title)
        if (auth.user.bio) {
            setBio(auth.user.bio)   
        }
        if (image !== auth.user.profilepic) {
            const getProfilePic = async () => {
                try {
                    const response = await usersService.getProfilePic(auth.user.username)
                    setImage(URL.createObjectURL(response))
                } catch (err) {
                    console.error('error: ', err)
                    if (!err.response) {
                        toast.error(<NoServerResponse />, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    } else {
                        toast.error(<UnableLoad />, {
                            position: toast.POSITION.TOP_CENTER
                        });
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
                toast.warn('Missing required field(s): title', {
                    position: toast.POSITION.TOP_CENTER
                });   
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
                toast.success('Profile successfully updated', {
                    position: toast.POSITION.TOP_CENTER
                });   
            }
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
                toast.error(<NoServerResponse />, {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error(<InvalidCredentials login={true}/>, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
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
        <div className='flex flex-col md:flex-row h-full bg-base-200'>
            <div className="left-side flex flex-col items-center md:w-3/5 md:max-w-3/5 md:border-r-2 md:border-r-base-300">
                <div className="w-4/5 mt-8">
                    <label className="label">
                        <span className="label-text text-xl font-bold">
                            Profile
                        </span>
                    </label>
                    <div className='card bg-base-100 border shadow-xl'>
                        <div className="card-body">
                            <form onSubmit={handleSave} id='profile-form' encType='multipart/form-data'>
                                <div className="flex flex-col md:flex-row items-center">
                                    <label htmlFor='profilepic'>
                                        <ProfilePicture src={image}/>
                                    </label>
                                    <input 
                                        type='file'
                                        id='profilepic'
                                        name='profilepic'
                                        accept='image/jpeg, image/jpg, image/png'
                                        onChange={handleFileUpload}
                                        className="file-input file-input-accent w-full md:ml-4 max-w-xs 
                                                file-input-xs sm:file-input-sm md:file-input-md" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor='title' className='label'>
                                        <span className='text-base label-text font-medium'>
                                            Profile Title
                                        </span>
                                    </label>
                                    <input 
                                        type='text'
                                        value={title}
                                        id='title'
                                        name='Title'
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength='30'
                                        autoComplete='off'
                                        required
                                        className="input input-accent input-bordered w-full bg-base-100"
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor='bio' className='label'>
                                        <span className='text-base label-text font-medium'>
                                            Bio
                                        </span>
                                        <span className="label-text-alt">{title.length}/30</span>
                                    </label>
                                    <textarea 
                                        value={bio}
                                        id='bio'
                                        name='Bio'
                                        placeholder="Bio"
                                        onChange={(e) => setBio(e.target.value)}
                                        rows='2'
                                        maxLength='80'
                                        form='profile-form'
                                        autoComplete='off'
                                        className="textarea textarea-accent textarea-bordered bg-base-100"
                                    />
                                    <label className="label">
                                        <span className="label-text-alt"></span>
                                        <span className="label-text-alt">{bio.length}/80</span>
                                    </label>
                                </div>
                                <div className="card-actions justify-start">
                                    <button type='submit' className="btn btn-accent btn-sm sm:btn-md md:btn-lg lg:btn-wide">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side flex flex-col items-center md:w-2/5 md:max-w-2/5">
                <div className="w-3/5 mt-8 mb-10">
                    <PreviewContext.Provider value={{image, title, bio, links: auth.user.links}}>
                        <PhonePreview />
                    </PreviewContext.Provider>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Appearance