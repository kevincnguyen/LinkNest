import PreviewLinkNest from './PreviewLinkNest';

function PhonePreview() {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg" />
      <div className="flex flex-col items-center rounded-[2rem] overflow-x-hidden overflow-y-auto w-[272px] h-[572px] bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100">
        <PreviewLinkNest />
      </div>
    </div>
  );
}

export default PhonePreview;
