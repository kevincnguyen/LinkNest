import { useParams } from 'react-router-dom'

const LinkNest = () => {
    const { username } = useParams()

    return (
        <div>
            @{username}
        </div>
    )
}

export default LinkNest