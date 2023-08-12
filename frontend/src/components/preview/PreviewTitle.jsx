import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

function PreviewTitle() {
  const { title } = useContext(PreviewContext);
  return (
    <h3 className="text-black text-lg text-center w-[90%] font-semibold mt-3 mb-1 break-words">
      {title}
    </h3>
  );
}

export default PreviewTitle;
