import PropTypes from 'prop-types'

const AddLinkButton = ({ hide }) => {
    return (
        <button onClick={() => hide()}>
                + Add link
        </button>
    )
}

AddLinkButton.propTypes = {
    hide: PropTypes.func.isRequired
}

export default AddLinkButton