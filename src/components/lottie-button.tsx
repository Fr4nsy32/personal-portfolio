import React, { useEffect, useRef } from "react";
import { LottieDisplay, useLottie, type UseLottieOptions } from "lottie-react";
import { cn } from "@/lib/utils";

const BASE_CLASSES = cn(
  "inline-flex cursor-pointer items-center justify-center gap-1.5",
  "rounded-full bg-white px-4 py-2 text-sm font-heading font-medium text-black",
  "shadow-[0px_0px_15px_8px] shadow-white/20",
  "transition duration-300 hover:bg-slate-100 hover:shadow-white/20 md:hover:shadow-[0px_0px_20px_10px]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
);

interface LottieButtonProps {
  text: string;
  animation: UseLottieOptions["src"];
  onComplete: () => void;
  type?: "button" | "submit";
  speed?: number;
  className?: string;
}

const LottieButton: React.FC<LottieButtonProps> = ({
  text,
  animation,
  onComplete,
  type = "button",
  speed = 1,
  className,
}) => {
  // Keep the latest onComplete in a ref, so the animation's "complete" event
  // never calls an outdated version (e.g. one that closed over old form state)
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Ignore clicks while the animation is running, so a double click
  // can't fire onComplete twice (important for "send")
  const busyRef = useRef(false);

  const lottie = useLottie({
    src: animation,
    loop: false,
    speed,
    subscriptions: {
      complete: () => {
        busyRef.current = false;
        onCompleteRef.current();
      },
      error: ({ error }) => {
        busyRef.current = false;
        console.error(error);
      },
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (busyRef.current) return;

    // Inside a form: only play when the fields are valid. The browser
    // shows its own messages for the invalid ones.
    const form = e.currentTarget.form;
    if (form && !form.reportValidity()) return;

    busyRef.current = true;
    lottie.play();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(BASE_CLASSES, className)}
    >
      <span>{text}</span>
      <LottieDisplay lottie={lottie} className="h-5 w-5" />
    </button>
  );
};

export default LottieButton;
