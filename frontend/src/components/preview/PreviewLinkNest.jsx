import { useContext } from 'react';
import PreviewContext from '../../context/PreviewContext';

import PreviewBio from './PreviewBio';
import PreviewLogo from './PreviewLogo';
import PreviewLinks from './PreviewLinks';
import PreviewTitle from './PreviewTitle';
import PreviewProfilePicture from './PreviewProfilePicture';

function PreviewLinkNest() {
  const { bio, links } = useContext(PreviewContext);
  return (
    <>
      <PreviewProfilePicture />
      <PreviewTitle />
      {bio && <PreviewBio />}
      {links && <PreviewLinks />}
      <PreviewLogo />
    </>
  );
}

export default PreviewLinkNest;
