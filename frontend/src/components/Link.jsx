import PropTypes from 'prop-types'

const Link = ({ url, desc }) => {
    return (
        <a href={url}>
            {desc}
        </a>
    )
}

Link.propTypes = {
    url: PropTypes.string.isRequired, 
    desc: PropTypes.string.isRequired
}

export default Link