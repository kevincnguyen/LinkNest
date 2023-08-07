import PropTypes from 'prop-types'

import DisplayLink from './DisplayLink'

const DisplayLinks = ({ links }) => {
    const sortedLinks = links.sort((a, b) => a.position - b.position)

    return (
        <div>
            {sortedLinks.map(link => {
                return (
                    <>
                        <DisplayLink 
                            key={link.id}
                            url={link.url}
                            desc={link.desc}
                        />
                        <br />
                    </>
                )
            })}
        </div>
    )
}

DisplayLinks.propTypes = {
    links: PropTypes.array.isRequired
}

export default DisplayLinks