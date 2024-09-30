import { DotPattern } from "../Icon";
import { CustomRadioBtn } from "./CustomRadioBtn";

interface FunctionCardProps {
  id: number;
  equation: string;
  nextFunction: string;
  onEquationChange: (id: number, equation: string) => void;
  onNextFunctionChange: (id: number, nextFunction: string) => void;
  functions: Array<{ id: number; equation: string; nextFunction: string }>;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  nextFunction,
  onEquationChange,
  onNextFunctionChange,
  functions,
}) => {
  return (
    <div
      id={`function-${id}`}
      className="flex flex-col gap-5 bg-white rounded-2xl border shadow-md py-4 px-5 w-[235px] h-64"
    >
      <div className="flex items-center gap-2">
        <DotPattern />

        <span className="text-[#A5A5A5] font-semibold text-sm">
          Function: {id}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium">Equation</label>
          <input
            type="text"
            value={equation}
            onChange={(e) => onEquationChange(id, e.target.value)}
            className="p-2 w-full rounded-lg border border-[#D3D3D3] text-xs font-medium"
          />
        </div>

        <div className="mb-2">
          <label className="text-xs font-medium">Next function</label>
          <select
            disabled
            value={nextFunction}
            onChange={(e) => onNextFunctionChange(id, e.target.value)}
            className="p-2 w-full rounded-lg border border-[#D3D3D3] text-xs font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <option value="">-</option>
            {functions.map(
              (f) =>
                f.id !== id && (
                  <option key={f.id} value={f.id.toString()}>
                    Function: {f.id}
                  </option>
                )
            )}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-auto">
        <CustomRadioBtn label="input" />
        <CustomRadioBtn align="right" label="output" />
      </div>
    </div>
  );
};
