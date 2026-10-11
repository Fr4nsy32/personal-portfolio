import React, { useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Tabs from "@/components/tabs";
import { panelDomId, tabDomId } from "@/utils/tab-ids";
import DemoForm from "./form";
import ContactLink from "./links";
import type { Contact, Tab, TabId } from "@/services/types";

const ContactsPage: React.FC = () => {
  const contactList: Contact[] = [
    {
      id: "github",
      label: "GitHub",
      value: "github.com/your-username",
      href: "https://github.com/your-username",
      icon: FaGithub,
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/your-name",
      href: "https://www.linkedin.com/in/your-name",
      icon: FaLinkedinIn,
      external: true,
    },
    {
      id: "email",
      label: "Email",
      value: "you@example.com",
      href: "mailto:you@example.com",
      icon: Mail,
    },
    {
      id: "phone",
      label: "Phone",
      value: "+39 000 000 0000",
      href: "tel:+390000000000",
      icon: Phone,
    },
  ];

  const ID_PREFIX = "contact";

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contactTabs: Tab[] = [
    { id: "form", label: "Send a message" },
    { id: "links", label: "Find me online" },
  ];
  const [activeTab, setActiveTab] = useState<TabId>(contactTabs[0].id);

  const panelClass = (id: TabId) =>
    cn(activeTab !== id && "hidden", "lg:block");

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 xl:px-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          variants={container}
          className="mb-10 flex flex-col items-center text-center lg:mb-14"
        >
          <motion.h1
            variants={item}
            className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl"
          >
            Get in touch
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-full text-base text-gray-400 lg:text-lg xl:text-xl"
          >
            Have a project in mind or just want to say hi? Send a message or
            reach me directly.
          </motion.p>
        </motion.header>

        <motion.div variants={item} className="mb-6 lg:mb-0">
          <Tabs
            tabs={contactTabs}
            activeId={activeTab}
            onSelect={setActiveTab}
            idPrefix={ID_PREFIX}
            label="Contact options"
            fill
            bordered={false}
            className="lg:hidden"
          />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.section
            variants={item}
            role="tabpanel"
            id={panelDomId(ID_PREFIX, "form")}
            aria-labelledby={tabDomId(ID_PREFIX, "form")}
            className={panelClass("form")}
          >
            {/* The tab acts as the title below lg */}
            <h2 className="mb-4 hidden font-heading text-lg font-medium text-white lg:block lg:text-xl">
              Send a message
            </h2>
            <DemoForm />
          </motion.section>

          <motion.section
            variants={item}
            role="tabpanel"
            id={panelDomId(ID_PREFIX, "links")}
            aria-labelledby={tabDomId(ID_PREFIX, "links")}
            className={panelClass("links")}
          >
            <h2 className="mb-4 hidden font-heading text-lg font-medium text-white lg:block lg:text-xl">
              Find me online
            </h2>
            <ul className="space-y-3">
              {contactList.map((contact) => (
                <li key={contact.id}>
                  <ContactLink contact={contact} />
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default ContactsPage;
