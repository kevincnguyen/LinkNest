import { useContext } from "react"
import { PreviewContext } from "../../context/PreviewContext"

import PreviewProfilePicture from './PreviewProfilePicture'
import PreviewTitle from './PreviewTitle'
import PreviewBio from './PreviewBio'
import PreviewLinks from './PreviewLinks'
import PreviewLogo from './PreviewLogo'

const PreviewLinkNest = () => {
    const {bio, links} = useContext(PreviewContext)
    return (
        <>
            <PreviewProfilePicture />
            <PreviewTitle />
            {bio && <PreviewBio />}
            {links && <PreviewLinks />}
            <PreviewLogo />
        </>
    )
}

export default PreviewLinkNest