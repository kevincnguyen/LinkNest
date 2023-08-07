import PropTypes from 'prop-types'

import { useState } from 'react'

const AddLinkForm = ({ handleAdd, hide }) => {
    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        await handleAdd(desc, url)
        hide()
    }

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor='description'>Description</label>
            <input 
                type='text'
                id='description'
                name='Description'
                placeholder='Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                autoComplete='off'
                required
            />
            <br />
            <label htmlFor='url'>Enter URL</label>
            <input 
                type="text"
                id='url'
                name='Url'
                placeholder='URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete='off'
                required
            />
            <button type='submit'>
                Add
            </button>
            <button onClick={() => hide()}>
                Cancel
            </button>
        </form>
    )
}

AddLinkForm.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired
}

export default AddLinkForm