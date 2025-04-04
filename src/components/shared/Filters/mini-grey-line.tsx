
export const MiniGreyLine = ({
  height = '35px',
  className = '',
}: {
  height?: string;
  className?: string;
}) => {
  return <div className={`w-[1px] bg-[#DDDDDD] ${className}`} style={{ height }}></div>;

};
