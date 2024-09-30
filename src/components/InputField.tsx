import { CustomRadioBtn } from "./CustomRadioBtn";

interface Props {
  inputValue: number;
  onInputChange: (value: number) => void;
}

export const InputField: React.FC<Props> = ({ inputValue, onInputChange }) => {
  return (
    <div className="flex border-2 border-[#FFC267] rounded-2xl max-w-[8.5rem] h-fit absolute top-[12.5rem] left-[5.25rem]">
      <input
        onChange={(e) => onInputChange(Number(e.target.value))}
        className="border-r border-[#FFEED5] rounded-s-2xl p-4 w-full"
        value={inputValue}
        type="number"
      />
      <div className="flex items-center justify-center p-4 bg-white rounded-e-2xl">
        <CustomRadioBtn />
      </div>
    </div>
  );
};
