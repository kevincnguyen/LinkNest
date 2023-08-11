import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

import NotFound from "./NotFound";
import ProfilePicture from '../components/ProfilePicture'
import DisplayTitle from '../components/nest/DisplayTitle'
import DisplayBio from '../components/nest/DisplayBio'
import DisplayLinks from '../components/nest/DisplayLinks'
import DisplayIcons from "../components/nest/DisplayIcons.jsx";
import DisplayLogo from '../components/nest/DisplayLogo'
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
                console.error('error: ', err);
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
                <DisplayTitle text={user.title} />
                {user.bio && <DisplayBio text={user.bio} />}
                {user.links && <DisplayLinks links={user.links} />}
                {user.links && <DisplayIcons links={user.links} />}
                <DisplayLogo />
            </div>
        </div>
    )
}

export default LinkNest