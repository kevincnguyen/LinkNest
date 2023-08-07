import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { StrictModeDroppable } from '../components/StrictModeDroppable'
import linksService from '../services/links'
import LinkCard from '../components/LinkCard'
import AddLinkForm from '../components/AddLinkForm'
import AddLinkButton from '../components/AddLinkButton'
import Notification from '../components/Notification'

const LinkBuilder = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth, setAuth } = useAuth()
    const [links, setLinks] = useState([])
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const sortedLinks = auth.user.links.sort((a, b) => a.position - b.position)
        setLinks(sortedLinks)
    }, [auth.user.links])

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.index !== destination.index) {
            const updatedLinks = [...links];
            const [movedLink] = updatedLinks.splice(source.index, 1)
            updatedLinks.splice(destination.index, 0, movedLink)
            updatedLinks.forEach((link, index) => {
                link.position = index
            })
            try {
                setLinks(updatedLinks)
                await Promise.all(updatedLinks.map(async (link, index) => {
                    if (links[index].id !== updatedLinks[index].id) {
                        await linksService.update(updatedLinks[index].id,
                                                    { position: updatedLinks[index].position},
                                                    axiosPrivate)
                    }
                }))
                setAuth({ ...auth, user: { ...auth.user, links: updatedLinks }})
            } catch (err) {
                console.log('error: ', err)
                if (!err.response) {
                    setMessage('No server response')
                } else {
                    setMessage('Unable to save changes. Please try again.')
                }
            }
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleAdd = async (desc, url) => {
        try {
            const linkUrl = url.startsWith('http://') ? url : 'http://' + url;
            const newLink = {
                url: linkUrl,
                desc, 
                position: links.length, 
                user: auth.user.id
            }
            const addedLink = await linksService.add(newLink, axiosPrivate)
            const updatedLinks = links.concat(addedLink)
            setLinks(updatedLinks)
            setAuth({ ...auth, user: { ...auth.user, links: updatedLinks }})
        } catch (err) {
            console.log('error: ', err)
            if (!err.response) {
                setMessage('No server response')
            } else {
                setMessage('Unable to save changes. Please try again.')
            }
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleSave = async (id, desc, url) => {
        try {
            const updatedLink = await linksService.update(id, { desc, url }, axiosPrivate) 
            const updatedLinks = links.map(link => link.id == id ? updatedLink : link);
            setLinks(updatedLinks)
            setAuth({ ...auth, user: { ...auth.user, links: updatedLinks }})
        } catch (err) {
            console.log('error: ', err)
            if (!err.response) {
                setMessage('No server response')
            } else {
                setMessage('Unable to save changes. Please try again.')
            }
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this forever?')) {
            try {
                await linksService.remove(id, axiosPrivate)
                const updatedLinks = auth.user.links.filter(l => l.id !== id)
                updatedLinks.forEach((link, index) => {
                    link.position = index
                })
                setLinks(updatedLinks)
                await Promise.all(updatedLinks.map(async (link, index) => {
                    if (links[index].id !== updatedLinks[index].id) {
                        await linksService.update(updatedLinks[index].id,
                                                    { position: updatedLinks[index].position},
                                                    axiosPrivate)
                    }
                }))
                setAuth({ ...auth, user: { ...auth.user, links: updatedLinks }})
            } catch (err) {
                console.log('error: ', err)
                if (!err.response) {
                    setMessage('No server response')
                } else {
                    setMessage('Unable to save changes. Please try again.')
                }
            }
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const toggleVisibility = () => {
        setVisible((prev) => !prev)
    }

    return (
        <div>
            {!visible && <AddLinkButton hide={toggleVisibility} />}
            {visible && <AddLinkForm handleAdd={handleAdd} hide={toggleVisibility} />}
            <DragDropContext onDragEnd={handleDragEnd}>
                <StrictModeDroppable droppableId='links-list'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
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
            <Notification message={message} />
        </div>
    )
}

export default LinkBuilder