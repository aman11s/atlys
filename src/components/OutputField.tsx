import { CustomRadioBtn } from "./CustomRadioBtn";

export const OutputField = () => {
  return (
    <div className="flex border-2 border-[#2DD179] rounded-2xl max-w-[8.5rem] h-fit absolute top-[12.5rem] right-[5.5rem]">
      <div className="flex items-center justify-center p-4 bg-white rounded-s-2xl">
        <CustomRadioBtn />
      </div>
      <input
        className="border-l border-[#C5F2DA] rounded-e-2xl p-4 w-full"
        type="number"
      />
    </div>
  );
};
