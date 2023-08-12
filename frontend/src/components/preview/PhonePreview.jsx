import PreviewLinkNest from './PreviewLinkNest';

function PhonePreview() {
  return (
    <div className="relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800">
      <div className="absolute -left-[17px] top-[72px] h-[32px] w-[3px] rounded-l-lg bg-gray-800" />
      <div className="absolute -left-[17px] top-[124px] h-[46px] w-[3px] rounded-l-lg bg-gray-800" />
      <div className="absolute -left-[17px] top-[178px] h-[46px] w-[3px] rounded-l-lg bg-gray-800" />
      <div className="absolute -right-[17px] top-[142px] h-[64px] w-[3px] rounded-r-lg bg-gray-800" />
      <div className="flex h-[572px] w-[272px] flex-col items-center overflow-y-auto overflow-x-hidden rounded-[2rem] bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100">
        <PreviewLinkNest />
      </div>
    </div>
  );
}

export default PhonePreview;
