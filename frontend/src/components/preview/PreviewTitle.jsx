import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

function PreviewTitle() {
  const { title } = useContext(PreviewContext);
  return (
    <h3 className="mb-1 mt-3 w-[90%] break-words text-center text-lg font-semibold text-black">
      {title}
    </h3>
  );
}

export default PreviewTitle;
