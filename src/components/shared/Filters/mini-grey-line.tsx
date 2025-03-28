export const MiniGreyLine = ({ height = '35px' }: { height?: string }) => {
  return <div className="w-[1px] bg-[#DDDDDD]" style={{ height: height || '35px' }}></div>;
};
