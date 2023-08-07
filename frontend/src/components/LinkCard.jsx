import PropTypes from 'prop-types'

import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import DeleteButton from './DeleteButton'

const LinkCard = ({ link, index, handleSave, handleDelete }) => {
    const [desc, setDesc] = useState(link.desc)
    const [url, setUrl] = useState(link.url)
    const [isFocused, setIsFocused] = useState(false)

    const handleBlur = async () => {
        setIsFocused(false)
        await handleSave(link.id, desc, url)
    }

    return (
        <>
            <Draggable draggableId={link.id} index={index}>
                {(provided) => {
                    return (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                            <div {...provided.dragHandleProps}>
                                *INSERT HANDLE*
                            </div>
                            <input 
                                type='text'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={handleBlur}
                            />
                            <br />
                            <input 
                                type='url'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={handleBlur}
                            />
                            <br />
                            <DeleteButton handleDelete={() => handleDelete(link.id)} />
                        </div>
                    )}
                }
            </Draggable>
        </>
    )
}

LinkCard.propTypes = {
    link: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default LinkCard;