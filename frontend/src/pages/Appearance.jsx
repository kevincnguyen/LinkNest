import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import usersService from '../services/users';
import PreviewContext from '../context/PreviewContext';
import ProfilePicture from '../components/ProfilePicture';
import UnableLoad from '../components/messages/UnableLoad';
import PhonePreview from '../components/preview/PhonePreview';
import NoServerResponse from '../components/messages/NoServerResponse';
import InvalidCredentials from '../components/messages/InvalidCredentials';

function Appearance() {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setTitle(auth.user.title);
    if (auth.user.bio) {
      setBio(auth.user.bio);
    }
    if (image !== auth.user.profilepic) {
      const getProfilePic = async () => {
        try {
          const response = await usersService.getProfilePic(auth.user.username);
          setImage(URL.createObjectURL(response));
        } catch (err) {
          console.error('error: ', err);
          if (!err.response) {
            toast.error(<NoServerResponse />, {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error(<UnableLoad />, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }
      };
      getProfilePic();
    }
  }, [auth.user.title, auth.user.bio, auth.user.profilepic]);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      if (!title) {
        toast.warn('Missing required field(s): title', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        let updatedUser;
        if (file) {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('bio', bio);
          formData.append('profilepic', file);
          updatedUser = await usersService.upload(
            auth.user.id,
            formData,
            axiosPrivate,
          );
        } else {
          updatedUser = await usersService.update(
            auth.user.id,
            {
              title,
              bio,
            },
            axiosPrivate,
          );
        }
        setAuth({ user: updatedUser, accessToken: auth.accessToken });
        toast.success('Profile successfully updated', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error('error: ', err);
      if (!err.response) {
        toast.error(<NoServerResponse />, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(<InvalidCredentials login />, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleFileUpload = (event) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex h-full flex-col bg-base-200 md:flex-row">
      <div className="left-side md:max-w-3/5 flex flex-col items-center md:w-3/5 md:border-r-2 md:border-r-base-300">
        <div className="mt-8 w-4/5">
          <label className="label">
            <span className="label-text text-xl font-bold">Profile</span>
          </label>
          <div className="card border bg-base-100 shadow-xl">
            <div className="card-body">
              <form
                onSubmit={handleSave}
                id="profile-form"
                encType="multipart/form-data"
              >
                <div className="flex flex-col items-center md:flex-row">
                  <label htmlFor="profilepic">
                    <ProfilePicture src={image} />
                  </label>
                  <input
                    type="file"
                    id="profilepic"
                    name="profilepic"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleFileUpload}
                    className="file-input file-input-accent file-input-xs w-full max-w-xs
                                                sm:file-input-sm md:file-input-md md:ml-4"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="label">
                    <span className="label-text text-base font-medium">
                      Profile Title
                    </span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    id="title"
                    name="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="30"
                    autoComplete="off"
                    required
                    className="input input-bordered input-accent w-full bg-base-100"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="bio" className="label">
                    <span className="label-text text-base font-medium">
                      Bio
                    </span>
                    <span className="label-text-alt">
                      {title.length}
                      /30
                    </span>
                  </label>
                  <textarea
                    value={bio}
                    id="bio"
                    name="Bio"
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    rows="2"
                    maxLength="80"
                    form="profile-form"
                    autoComplete="off"
                    className="textarea textarea-bordered textarea-accent bg-base-100"
                  />
                  <label className="label">
                    <span className="label-text-alt" />
                    <span className="label-text-alt">
                      {bio.length}
                      /80
                    </span>
                  </label>
                </div>
                <div className="card-actions justify-start">
                  <button
                    type="submit"
                    className="btn btn-accent btn-sm sm:btn-md md:btn-lg lg:btn-wide"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side md:max-w-2/5 flex flex-col items-center md:w-2/5">
        <div className="mb-10 mt-8 w-3/5">
          <PreviewContext.Provider
            value={{
              image,
              title,
              bio,
              links: auth.user.links,
            }}
          >
            <PhonePreview />
          </PreviewContext.Provider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Appearance;
