import { CustomRadioBtn } from "./CustomRadioBtn";

export const InputField = () => {
  return (
    <div className="flex border-2 border-[#FFC267] rounded-2xl max-w-[8.5rem] h-fit absolute top-[12.5rem] left-[5.25rem]">
      <input
        className="border-r border-[#FFEED5] rounded-s-2xl p-4 w-full"
        type="number"
      />
      <div className="flex items-center justify-center p-4 bg-white rounded-e-2xl">
        <CustomRadioBtn />
      </div>
    </div>
  );
};
