import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

function PreviewBio() {
  const { bio } = useContext(PreviewContext);
  return (
    <p className="text-black text-sm text-center w-[75%] font-light mb-3 break-words">
      {bio}
    </p>
  );
}

export default PreviewBio;
