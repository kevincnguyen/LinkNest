import { useContext } from "react"
import { PreviewContext } from "../../context/PreviewContext"

import PreviewLink from './PreviewLink'

const PreviewLinks = () => {
    const { links } = useContext(PreviewContext)
    return (
        <div className='w-[90%]'>
            {links.map(link => (
                <PreviewLink
                    key={link.url}
                    url={link.url}
                    desc={link.desc}
                />
            ))}
        </div>
    )
}

export default PreviewLinks