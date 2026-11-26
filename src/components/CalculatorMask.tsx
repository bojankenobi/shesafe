"use client";

import { useState } from "react";
import { verifyPin } from "@/utils/pinAuth";

interface CalculatorMaskProps {
  onUnlock: () => void;
  onWipeAll: () => void;
}

export function CalculatorMask({ onUnlock, onWipeAll }: CalculatorMaskProps) {
  const [display, setDisplay] = useState("0");
  const [historyLine, setHistoryLine] = useState("");
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
      setHistoryLine(`${current} ${nextOp}`);
    } else if (operator && !waitingNext) {
      const result = compute(prevValue, current, operator);
      const formatted = Number(result.toFixed(8));
      setPrevValue(formatted);
      setDisplay(String(formatted));
      setHistoryLine(`${formatted} ${nextOp}`);
    } else {
      setHistoryLine(`${prevValue} ${nextOp}`);
    }
    setOperator(nextOp);
    setWaitingNext(true);
  };

  const handleEquals = async () => {
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
        onWipeAll();
        setDisplay("0");
        setHistoryLine("");
        return;
      }
      return;
    }

    if (prevValue === null || !operator) return;
    const current = parseFloat(display);
    const result = compute(prevValue, current, operator);
    setHistoryLine(`${prevValue} ${operator} ${current} =`);
    setDisplay(String(Number(result.toFixed(8))));
    setPrevValue(null);
    setOperator(null);
    setWaitingNext(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setHistoryLine("");
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0D12] p-4 text-white select-none">
      <div className="w-full max-w-[330px] rounded-[2.25rem] bg-[#12161F] p-5 shadow-2xl ring-1 ring-white/10">
        {/* Display */}
        <div className="mb-5 flex h-28 flex-col justify-end rounded-2xl bg-[#0A0D12]/80 px-4 py-3 text-right">
          <div className="min-h-5 truncate font-mono text-xs text-slate-500">
            {historyLine}
          </div>
          <div className="mt-1 truncate font-mono text-4xl font-light tracking-tight text-white">
            {display}
          </div>
        </div>

        {/* Circular / Pill Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn) => {
            const isOp = ["÷", "×", "-", "+"].includes(btn);
            const isTop = ["C", "±", "%"].includes(btn);
            return (
              <button
                key={btn}
                type="button"
                onClick={() => onButtonClick(btn)}
                className={`flex h-15 items-center justify-center rounded-full text-xl font-medium transition-transform active:scale-92 ${
                  isOp
                    ? "bg-amber-500 text-white hover:bg-amber-400"
                    : isTop
                    ? "bg-slate-600/80 text-slate-100 hover:bg-slate-600"
                    : "bg-[#1F2533] text-white hover:bg-[#2A3244]"
                }`}
              >
                {btn}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => inputDigit("0")}
            className="col-span-2 flex h-15 items-center justify-start rounded-full bg-[#1F2533] pl-7 text-xl font-medium text-white transition-transform hover:bg-[#2A3244] active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={inputDot}
            className="flex h-15 items-center justify-center rounded-full bg-[#1F2533] text-xl font-medium text-white transition-transform hover:bg-[#2A3244] active:scale-92"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="flex h-15 items-center justify-center rounded-full bg-amber-500 text-xl font-medium text-white transition-transform hover:bg-amber-400 active:scale-92"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
