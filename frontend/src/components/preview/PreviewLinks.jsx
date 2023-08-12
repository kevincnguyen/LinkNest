import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

import PreviewLink from './PreviewLink';

function PreviewLinks() {
  const { links } = useContext(PreviewContext);
  return (
    <div className="w-[90%]">
      {links.map((link) => (
        <PreviewLink key={link.id} url={link.url} desc={link.desc} />
      ))}
    </div>
  );
}

export default PreviewLinks;
