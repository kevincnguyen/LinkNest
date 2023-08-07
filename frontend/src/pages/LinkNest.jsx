import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

import NotFound from "./NotFound";
import ProfilePicture from '../components/ProfilePicture'
import Title from '../components/Title'
import Bio from '../components/Bio'
import DisplayLinks from '../components/DisplayLinks'
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
        <>
            <ProfilePicture src={profilePicture} />
            <Title text={user.title} />
            {user.bio && <Bio text={user.bio} />}
            {user.links && <DisplayLinks links={user.links} />}
            <Logo />
        </>
    )
}

export default LinkNest