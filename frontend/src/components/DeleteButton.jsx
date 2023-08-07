import PropTypes from 'prop-types'

const DeleteButton = ({ handleDelete }) => {
    return (
        <button onClick={handleDelete}>
            *INSERT TRASH ICON*
        </button>
    )
}

DeleteButton.propTypes = {
    handleDelete: PropTypes.func.isRequired
}

export default DeleteButton;