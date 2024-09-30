import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FunctionCard, InputField, OutputField } from "./components";

interface Function {
  id: number;
  equation: string;
  nextFunction: string;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [functions, setFunctions] = useState<Function[]>([
    { id: 1, equation: "x^2", nextFunction: "2" },
    { id: 2, equation: "2*x+4", nextFunction: "4" },
    { id: 3, equation: "x^2+20", nextFunction: "" },
    { id: 4, equation: "x-2", nextFunction: "5" },
    { id: 5, equation: "x/2", nextFunction: "3" },
  ]);

  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const validateEquation = (equation: string): boolean => {
    const validOperators = /^[x0-9+\-*/^()\s]+$/;
    if (!validOperators.test(equation)) {
      return false;
    }

    // Check for implicit multiplication (e.g., 2x should be invalid)
    const implicitMultiplication = /\d+x/;
    if (implicitMultiplication.test(equation)) {
      return false;
    }

    return true;
  };

  const calculateResult = (x: number, equation: string): number => {
    const sanitizedEquation = equation.replace(/\^/g, "**");
    try {
      return new Function("x", `return ${sanitizedEquation}`)(x);
    } catch (error) {
      console.error("Error in calculation:", error);
      return NaN;
    }
  };

  useEffect(() => {
    // execute chain IIFE
    (() => {
      let currentValue = inputValue;
      let currentFunctionId = "1";

      for (let i = 0; i < 5; i++) {
        const currentFunction = functions.find(
          (f) => f.id.toString() === currentFunctionId
        );
        if (!currentFunction) break;

        if (!validateEquation(currentFunction.equation)) {
          console.error(`Invalid equation: ${currentFunction.equation}`);
          setResult(null);
          return;
        }

        currentValue = calculateResult(currentValue, currentFunction.equation);
        currentFunctionId = currentFunction.nextFunction;

        if (!currentFunctionId) break;
      }

      setResult(currentValue);
    })();
  }, [inputValue, functions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.zIndex = "15";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lightBlueColor = "rgba(0, 102, 255, 0.3)";

    // Straight line from input to 1st function
    ctx.beginPath();
    ctx.strokeStyle = lightBlueColor;
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.moveTo(194, 310);
    ctx.lineTo(267, 310);
    ctx.stroke();

    // Draw Bezier curve from Function 1 to Function 2
    // ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    ctx.beginPath();
    ctx.moveTo(444, 308);
    ctx.bezierCurveTo(512, 360, 582, 340, 633, 308);
    ctx.stroke();

    // Draw Bezier curve from Function 2 to Function 4
    // ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    ctx.beginPath();
    ctx.moveTo(809, 307);
    ctx.bezierCurveTo(790, 415, 480, 500, 450, 691);
    ctx.stroke();

    // Draw Bezier curve from Function 4 to Function 5
    // ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    ctx.beginPath();
    ctx.moveTo(627, 693);
    ctx.bezierCurveTo(696, 745, 746, 745, 814, 693);
    ctx.stroke();

    // Draw Bezier curve from Function 5 to Function 3
    // ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    ctx.beginPath();
    ctx.moveTo(991, 693);
    ctx.bezierCurveTo(1020, 500, 1040, 500, 995, 309);
    ctx.stroke();

    // Straight line from Function 3 to output
    ctx.beginPath();
    ctx.strokeStyle = lightBlueColor;
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.moveTo(1172, 310);
    ctx.lineTo(1242, 310);
    ctx.stroke();
  }, []);

  const handleEquationChange = (id: number, newEquation: string) => {
    if (validateEquation(newEquation)) {
      setFunctions(
        functions.map((f) =>
          f.id === id ? { ...f, equation: newEquation } : f
        )
      );
    } else {
      console.error("Invalid equation entered");
    }
  };

  const handleNextFunctionChange = (id: number, newNextFunction: string) => {
    setFunctions(
      functions.map((f) =>
        f.id === id ? { ...f, nextFunction: newNextFunction } : f
      )
    );
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-dot-grid bg-16">
      <canvas ref={canvasRef} className="absolute pointer-events-none" />

      <div className="relative z-10">
        <div className="flex mt-20 mx-40">
          <InputField
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />

          <div className="flex flex-wrap gap-32 justify-center">
            {functions.map((func) => (
              <FunctionCard
                key={func.id}
                id={func.id}
                equation={func.equation}
                nextFunction={func.nextFunction}
                onEquationChange={handleEquationChange}
                onNextFunctionChange={handleNextFunctionChange}
                functions={functions}
              />
            ))}
          </div>

          <OutputField result={result} />
        </div>
      </div>
    </main>
  );
}

export default App;
