import React, { useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import sendAnimation from "@/assets/lottie/send_animation.json";
import { cn } from "@/lib/utils";
import LottieButton from "@/components/lottie-button";
import { sendContactMessage } from "@/services/contact";

type RequestState = "idle" | "sending" | "success" | "error";

const DemoForm: React.FC = () => {
  const { t } = useTranslation("contacts", { keyPrefix: "form" });
  const [request, setRequest] = useState<RequestState>("idle");
  const [animationDone, setAnimationDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const labelClass = "mb-1.5 block text-xs font-medium text-white";
  const fieldClass = cn(
    "w-full rounded-lg border border-neutral-800 bg-black px-3 py-2.5 text-sm text-white",
    "placeholder:text-neutral-600 transition-colors hover:border-neutral-600",
    "focus-visible:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white",
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (request === "sending") return;

    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);

    setAnimationDone(false); 
    setRequest("sending");

    try {
      await sendContactMessage({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        subject: String(fd.get("subject") ?? "").trim() || undefined,
        message: String(fd.get("message") ?? "").trim(),
      });
      setRequest("success");
    } catch {
      setRequest("error");
    }
  };

  const status: "idle" | "sending" | "sent" | "error" =
    request === "success" ? (animationDone ? "sent" : "sending") : request;

  const handleAnimationComplete = () => {
    if (request == "error") return;
    setAnimationDone(true);
    formRef.current?.reset();
  };

  const statusText = {
    idle: t("statusIdle"),
    sending: t("statusSending"),
    sent: t("statusSent"),
    error: t("statusError"),
  }[status];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={() => {
        if (request === "success" || request === "error") setRequest("idle");
      }}
      className="space-y-4 rounded-xl border border-neutral-800 bg-black p-5 lg:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t("name.label")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={t("name.placeholder")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t("email.label")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t("email.placeholder")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          {t("subject.label")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t("subject.placeholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("message.label")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder={t("message.placeholder")}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <LottieButton
          type="submit"
          text={t("submit")}
          animation={sendAnimation}
          onComplete={handleAnimationComplete}
        />

        <p
          role="status"
          className={cn(
            "text-xs",
            status === "error" ? "text-red-400" : "text-neutral-400",
          )}
        >
          {statusText}
        </p>
      </div>
    </form>
  );
};

export default DemoForm;
