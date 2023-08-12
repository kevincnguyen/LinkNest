import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

function PreviewProfilePicture() {
  const { image } = useContext(PreviewContext);
  return (
    <div className="avatar mt-10">
      <div className="w-20 rounded-full">
        <img src={image} alt="Profile Picture" />
      </div>
    </div>
  );
}

export default PreviewProfilePicture;
