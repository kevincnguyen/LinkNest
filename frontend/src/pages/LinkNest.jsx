import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

import NotFound from "./NotFound";
import ProfilePicture from '../components/ProfilePicture'
import Title from '../components/Title'
import Bio from '../components/Bio'
import DisplayLinks from '../components/DisplayLinks'
import Icons from '../components/Icons.jsx'
import Logo from '../components/Logo'
import Loading from '../components/Loading'

const LinkNest = () => {
    const { username } = useParams();
    const [user, setUser] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const [userInfo, profilePicData] = await Promise.all([
                    usersService.getInfo(username),
                    usersService.getProfilePic(username)
                ]);
                setUser(userInfo);
                setProfilePicture(URL.createObjectURL(profilePicData));
                setLoading(false);
            } catch (err) {
                console.log('error: ', err);
                setLoading(false);
            }
        }
        getData()
    }, [username])

    if (loading) {
        return <Loading />
    }

    if (!user || !profilePicture) {
        return <NotFound />
    }

    return (
        <div className="h-screen bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100">
            <div className="flex flex-col items-center justify-center mx-auto max-w-2xl w-full pt-16 px-8">
                <ProfilePicture src={profilePicture} />
                <Title text={user.title} />
                {user.bio && <Bio text={user.bio} />}
                {user.links && <DisplayLinks links={user.links} />}
                {user.links && <Icons links={user.links} />}
                <Logo />
            </div>
        </div>
    )
}

export default LinkNest