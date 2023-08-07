import PropTypes from 'prop-types'

const DisplayLink = ({ url, desc }) => {
    return (
        <a href={url}>
            {desc}
        </a>
    )
}

DisplayLink.propTypes = {
    url: PropTypes.string.isRequired, 
    desc: PropTypes.string.isRequired
}

export default DisplayLink