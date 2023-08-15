import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import linksService from '../services/links';
import usersService from '../services/users';
import PreviewContext from '../context/PreviewContext';
import LinkCard from '../components/builder/LinkCard';
import UnableSave from '../components/messages/UnableSave';
import UnableLoad from '../components/messages/UnableLoad';
import AddLinkForm from '../components/builder/AddLinkForm';
import PhonePreview from '../components/preview/PhonePreview';
import AddLinkButton from '../components/builder/AddLinkButton';
import NoServerResponse from '../components/messages/NoServerResponse';
import StrictModeDroppable from '../components/builder/StrictModeDroppable';

function LinkBuilder() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [links, setLinks] = useState([]);
  const [image, setImage] = useState(null);

  const updatePositions = async (linksToUpdate) => {
    const updatedLinks = linksToUpdate.map((link, index) => ({
      ...link,
      position: index,
    }));
    setLinks(updatedLinks);
    await Promise.all(
      updatedLinks.map(async (link, index) => {
        if (links[index].id !== updatedLinks[index].id) {
          await linksService.update(
            updatedLinks[index].id,
            { position: updatedLinks[index].position },
            axiosPrivate,
          );
        }
      }),
    );
    setAuth({ ...auth, user: { ...auth.user, links: updatedLinks } });
  };

  const showError = (err) => {
    console.log('error: ', err);
    if (!err.response) {
      toast.error(<NoServerResponse />, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(<UnableSave />, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const sortedLinks = auth.user.links.sort((a, b) => a.position - b.position);
    setLinks(sortedLinks);
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
  }, [auth.user.links, auth.user.username]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index !== destination.index) {
      const updatedLinks = [...links];
      const [movedLink] = updatedLinks.splice(source.index, 1);
      updatedLinks.splice(destination.index, 0, movedLink);
      try {
        updatePositions(updatedLinks);
      } catch (err) {
        showError(err);
      }
    }
  };

  const handleAdd = async (desc, url) => {
    try {
      const linkUrl = url.startsWith('http') ? url : `http://${url}`;
      const newLink = {
        url: linkUrl,
        desc,
        position: links.length,
        user: auth.user.id,
      };
      const addedLink = await linksService.add(newLink, axiosPrivate);
      const updatedLinks = links.concat(addedLink);
      setLinks(updatedLinks);
      setAuth({ ...auth, user: { ...auth.user, links: updatedLinks } });
    } catch (err) {
      showError(err);
    }
  };

  const handleSave = async (id, desc, url) => {
    try {
      const updatedLink = await linksService.update(
        id,
        { desc, url },
        axiosPrivate,
      );
      const updatedLinks = links.map((link) =>
        link.id === id ? updatedLink : link,
      );
      setLinks(updatedLinks);
      setAuth({ ...auth, user: { ...auth.user, links: updatedLinks } });
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this forever?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await linksService.remove(id, axiosPrivate);
        const updatedLinks = auth.user.links.filter((l) => l.id !== id);
        updatePositions(updatedLinks);
      } catch (err) {
        showError(err);
      }
    }
  };

  return (
    <div className="flex h-full flex-col bg-base-200 md:flex-row">
      <div
        className="left-side md:max-w-3/5 flex flex-col items-center border-b-2 border-b-base-300
                            pb-8 md:w-3/5 md:border-b-0 md:border-r-2 md:border-r-base-300"
      >
        <div className="stats mt-8 flex w-11/12 items-center justify-center shadow">
          <div className="stat flex justify-between">
            <div>
              <div className="stat-title">Your LinkNest is live:</div>
              <a
                href={`https://linknest.onrender.com/${auth.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                {`https://linknest.onrender.com/${auth.user.username}`}
              </a>
            </div>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://linknest.onrender.com/${auth.user.username}`,
                )
              }
              className="btn btn-accent btn-md"
            >
              Copy URL
            </button>
          </div>
        </div>
        <AddLinkButton />
        <AddLinkForm handleAdd={handleAdd} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="links-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-3/5"
              >
                {links.map((link, index) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    index={index}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
      <div className="right-side md:max-w-2/5 flex flex-col items-center md:w-2/5">
        <div className="mb-10 mt-8 w-3/5">
          <PreviewContext.Provider
            value={{
              image,
              title: auth.user.title,
              bio: auth.user.bio,
              links,
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

export default LinkBuilder;
