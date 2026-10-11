import React, { useRef, useState } from "react";
import sendAnimation from "@/assets/lottie/sendAnimation.json";

import { cn } from "@/lib/utils";
import LottieButton from "@/components/lottie-button";

const DemoForm: React.FC = () => {
  const labelClass = "mb-1.5 block text-xs font-medium text-white";
  const fieldClass = cn(
    "w-full rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white",
    "placeholder:text-neutral-600 transition-colors hover:border-neutral-600",
    "focus-visible:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white",
  );
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      onChange={() => sent && setSent(false)}
      className="space-y-4 rounded-xl border border-neutral-800 bg-black p-5 lg:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            // required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            // required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="What is it about?"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          //   required
          placeholder="Tell me about your project or idea..."
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <LottieButton
          type="submit"
          text="Send message"
          animation={sendAnimation}
          onComplete={handleSubmit}
        />

        <p role="status" className="text-xs text-neutral-400">
          {sent
            ? "Thanks! This is a demo, so nothing was actually sent."
            : "Demo form: submitting doesn't send anything yet."}
        </p>
      </div>
    </form>
  );
};

export default DemoForm;
