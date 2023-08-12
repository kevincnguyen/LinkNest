import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usersService from '../services/users';

import NotFound from './NotFound';
import Loading from '../components/Loading';
import DisplayBio from '../components/nest/DisplayBio';
import DisplayLogo from '../components/nest/DisplayLogo';
import ProfilePicture from '../components/ProfilePicture';
import DisplayTitle from '../components/nest/DisplayTitle';
import DisplayLinks from '../components/nest/DisplayLinks';
import DisplayIcons from '../components/nest/DisplayIcons';

function LinkNest() {
  const { username } = useParams();
  const [user, setUser] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [userInfo, profilePicData] = await Promise.all([
          usersService.getInfo(username),
          usersService.getProfilePic(username),
        ]);
        setUser(userInfo);
        setProfilePicture(URL.createObjectURL(profilePicData));
        setLoading(false);
      } catch (err) {
        console.error('error: ', err);
        setLoading(false);
      }
    };
    getData();
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  if (!user || !profilePicture) {
    return <NotFound />;
  }

  return (
    <div className="h-screen bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-8 pt-16">
        <ProfilePicture src={profilePicture} />
        <DisplayTitle text={user.title} />
        {user.bio && <DisplayBio text={user.bio} />}
        {user.links && <DisplayLinks links={user.links} />}
        {user.links && <DisplayIcons links={user.links} />}
        <DisplayLogo />
      </div>
    </div>
  );
}

export default LinkNest;
