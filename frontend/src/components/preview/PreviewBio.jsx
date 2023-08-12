import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

function PreviewBio() {
  const { bio } = useContext(PreviewContext);
  return (
    <p className="mb-3 w-[75%] break-words text-center text-sm font-light text-black">
      {bio}
    </p>
  );
}

export default PreviewBio;
