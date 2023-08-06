import PropTypes from 'prop-types'

import Link from './Link'

const Links = ({ links }) => {
    const sortedLinks = links.sort((a, b) => a.position - b.position).reverse()

    return (
        <div>
            {sortedLinks.map(link => 
                <Link 
                    key={link.id}
                    url={link.url}
                    desc={link.desc}
                />
            )}
        </div>
    )
}

Links.propTypes = {
    links: PropTypes.array.isRequired
}

export default Links