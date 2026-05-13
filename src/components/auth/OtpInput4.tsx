import { useEffect, useMemo, useRef, useState } from "react";

type OtpInput4Props = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

const sanitizeOtp = (raw: string) => raw.replace(/\D/g, "").slice(0, 4);

export default function OtpInput4({
  value,
  onChange,
  disabled,
  autoFocus,
}: OtpInput4Props) {
  const digits = useMemo(() => {
    const s = sanitizeOtp(value);
    return Array.from({ length: 4 }, (_, i) => s[i] ?? "");
  }, [value]);

  const [activeIndex, setActiveIndex] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) {
      inputsRef.current[0]?.focus();
    }
  }, [autoFocus]);

  const focusIndex = (i: number) => {
    const el = inputsRef.current[i];
    if (el) {
      el.focus();
      el.select?.();
    }
  };

  const setDigit = (i: number, digit: string) => {
    const next = digits
      .map((d, idx) => (idx === i ? digit : d))
      .join("");
    onChange(sanitizeOtp(next));
    setActiveIndex(i);

    if (digit && i < 3) focusIndex(i + 1);
  };

  return (
    <div className="flex items-center gap-2 justify-center" dir="ltr">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          disabled={disabled}
          aria-label={`OTP digit ${i + 1}`}
          onFocus={() => setActiveIndex(i)}
          onChange={(e) => {
            if (disabled) return;
            const digit = sanitizeOtp(e.target.value);
            // If user pastes a value into one box, it may contain multiple digits
            if (digit.length > 1) {
              onChange(sanitizeOtp(digit));
              focusIndex(3);
              return;
            }
            setDigit(i, digit);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Backspace") {
              if (digits[i]) {
                setDigit(i, "");
                return;
              }
              if (i > 0) {
                const prevIndex = i - 1;
                setDigit(prevIndex, "");
                focusIndex(prevIndex);
              }
            }
            if (e.key === "ArrowLeft" && i > 0) {
              focusIndex(i - 1);
            }
            if (e.key === "ArrowRight" && i < 3) {
              focusIndex(i + 1);
            }
          }}
          onPaste={(e) => {
            if (disabled) return;
            const paste = sanitizeOtp(e.clipboardData.getData("text"));
            if (!paste) return;
            onChange(paste);
            focusIndex(3);
            e.preventDefault();
          }}
          className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue-all-800 disabled:opacity-60"
        />
      ))}
      {/* keep for screen readers */}
      <span className="sr-only">OTP: {digits.join("")}</span>
    </div>
  );
}

