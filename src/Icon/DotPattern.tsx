export const DotPattern = () => {
  return (
    <span className="grid grid-cols-3 gap-1 justify-items-center content-center w-4 h-2 ">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-1 h-1 bg-[#CDCDCD] rounded-full"></div>
      ))}
    </span>
  );
};
