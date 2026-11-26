"use client";

import { useState } from "react";
import { verifyPin } from "@/utils/pinAuth";

interface CalculatorMaskProps {
  onUnlock: () => void;
  onWipeAll: () => void;
}

export function CalculatorMask({ onUnlock, onWipeAll }: CalculatorMaskProps) {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingNext, setWaitingNext] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingNext) {
      setDisplay(digit);
      setWaitingNext(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingNext) {
      setDisplay("0.");
      setWaitingNext(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const compute = (a: number, b: number, op: string): number => {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") return b !== 0 ? a / b : 0;
    return b;
  };

  const handleOperator = (nextOp: string) => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operator && !waitingNext) {
      const result = compute(prevValue, current, operator);
      setPrevValue(result);
      setDisplay(String(Number(result.toFixed(8))));
    }
    setOperator(nextOp);
    setWaitingNext(true);
  };

  const handleEquals = async () => {
    // Discreet shortcuts & PIN verification when no arithmetic operator is active
    if (prevValue === null && !operator) {
      if (display === "112" || display === "192" || display === "122") {
        window.location.href = `tel:${display}`;
        return;
      }

      if (/^\d{4,}$/.test(display)) {
        const isValid = await verifyPin(display);
        if (isValid) {
          onUnlock();
          return;
        }
        // Wrong PIN: silently wipe all data and reset display to 0
        onWipeAll();
        setDisplay("0");
        return;
      }
      return;
    }

    if (prevValue === null || !operator) return;
    const current = parseFloat(display);
    const result = compute(prevValue, current, operator);
    setDisplay(String(Number(result.toFixed(8))));
    setPrevValue(null);
    setOperator(null);
    setWaitingNext(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingNext(false);
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
  ];

  const onButtonClick = (btn: string) => {
    if (/^\d$/.test(btn)) return inputDigit(btn);
    if (btn === "C") return handleClear();
    if (btn === "±") return setDisplay(String(parseFloat(display) * -1));
    if (btn === "%") return setDisplay(String(parseFloat(display) / 100));
    if (["+", "-", "×", "÷"].includes(btn)) return handleOperator(btn);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-xs rounded-3xl bg-slate-900 p-5 shadow-2xl ring-1 ring-slate-800">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span>Calculator</span>
          <span>STD</span>
        </div>

        <div className="mb-5 flex h-20 items-end justify-end overflow-hidden rounded-2xl bg-slate-950/60 px-4 py-3 text-right font-mono text-4xl font-light tracking-tight">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {buttons.flat().map((btn) => {
            const isOp = ["÷", "×", "-", "+"].includes(btn);
            const isTop = ["C", "±", "%"].includes(btn);
            return (
              <button
                key={btn}
                type="button"
                onClick={() => onButtonClick(btn)}
                className={`flex h-14 items-center justify-center rounded-2xl text-lg font-medium transition-colors active:scale-95 ${
                  isOp
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : isTop
                    ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                }`}
              >
                {btn}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => inputDigit("0")}
            className="col-span-2 flex h-14 items-center justify-center rounded-2xl bg-slate-800 text-lg font-medium text-white hover:bg-slate-700 active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={inputDot}
            className="flex h-14 items-center justify-center rounded-2xl bg-slate-800 text-lg font-medium text-white hover:bg-slate-700 active:scale-95"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="flex h-14 items-center justify-center rounded-2xl bg-amber-500 text-lg font-medium text-white hover:bg-amber-600 active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
