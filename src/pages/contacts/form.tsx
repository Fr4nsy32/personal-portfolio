import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import sendAnimation from "@/assets/lottie/send_animation.json";

import { cn } from "@/lib/utils";
import LottieButton from "@/components/lottie-button";

const DemoForm: React.FC = () => {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const labelClass = "mb-1.5 block text-xs font-medium text-white";
  const fieldClass = cn(
    "w-full rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white",
    "placeholder:text-neutral-600 transition-colors hover:border-neutral-600",
    "focus-visible:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white",
  );

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
            {t("contacts.form.name.label")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            // required
            placeholder={t("contacts.form.name.placeholder")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t("contacts.form.email.label")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            // required
            placeholder={t("contacts.form.email.placeholder")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          {t("contacts.form.subject.label")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t("contacts.form.subject.placeholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("contacts.form.message.label")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          //   required
          placeholder={t("contacts.form.message.placeholder")}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <LottieButton
          type="submit"
          text={t("contacts.form.submit")}
          animation={sendAnimation}
          onComplete={handleSubmit}
        />

        <p role="status" className="text-xs text-neutral-400">
          {sent ? t("contacts.form.statusSent") : t("contacts.form.statusIdle")}
        </p>
      </div>
    </form>
  );
};

export default DemoForm;
