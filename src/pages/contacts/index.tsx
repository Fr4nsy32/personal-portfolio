import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, MotionConfig } from "motion/react";
import { Link, Mail, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Tabs from "@/components/tabs";
import { panelDomId, tabDomId } from "@/lib/tab-ids";
import DemoForm from "./form";
import type { Contact, Tab, TabId } from "@/types";
import MotionHeader from "@/components/motion-header";
import ContactLinks from "./contact-links";
import { motionContainer, motionItem } from "@/lib/motion-variants";

const ID_PREFIX = "contact";

const ContactsPage: React.FC = () => {
  const { t } = useTranslation();

  const contactList: Contact[] = [
    {
      id: "github",
      label: t("contacts.links.github"),
      value: `github.com/${import.meta.env.VITE_GITHUB_USER}`,
      href: `https://www.github.com/${import.meta.env.VITE_GITHUB_USER}`,
      icon: FaGithub,
      external: true,
    },
    {
      id: "linkedin",
      label: t("contacts.links.linkedin"),
      value: `linkedin.com/in/${import.meta.env.VITE_LINKEDIN_USER}`,
      href: `https://www.linkedin.com/in/${import.meta.env.VITE_LINKEDIN_USER}`,
      icon: FaLinkedinIn,
      external: true,
    },
    {
      id: "email",
      label: t("contacts.links.email"),
      value: import.meta.env.VITE_EMAIL,
      href: `mailto:${import.meta.env.VITE_EMAIL}`,
      icon: Mail,
    },
    {
      id: "phone",
      label: t("contacts.links.phone"),
      value: import.meta.env.VITE_PHONE_NUMBER,
      href: `tel:${import.meta.env.VITE_PHONE_NUMBER}`,
      icon: Phone,
    },
  ];

  const contactTabs: Tab[] = [
    { id: "form", label: t("contacts.tabs.form"), icon: Send },
    { id: "links", label: t("contacts.tabs.links"), icon: Link },
  ];
  const [activeTab, setActiveTab] = useState<TabId>(contactTabs[0].id);

  const panelClass = (id: TabId) =>
    cn(activeTab !== id && "hidden", "lg:block");

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 xl:px-12 "
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={motionContainer}
          className="mb-10 flex flex-col items-center text-center lg:mb-14"
        >
          <MotionHeader
            title={t("contacts.header.title")}
            description={t("contacts.header.description")}
            full
          />
        </motion.div>

        <motion.div variants={motionItem} className="mb-6 lg:mb-0">
          <Tabs
            tabs={contactTabs}
            activeId={activeTab}
            onSelect={setActiveTab}
            idPrefix={ID_PREFIX}
            label={t("contacts.tabsLabel")}
            fill
            bordered={false}
            className="lg:hidden"
          />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.section
            variants={motionItem}
            role="tabpanel"
            id={panelDomId(ID_PREFIX, "form")}
            aria-labelledby={tabDomId(ID_PREFIX, "form")}
            className={panelClass("form")}
          >
            {/* The tab acts as the title below lg */}
            <h2 className="mb-4 hidden font-heading text-lg font-medium text-white lg:block lg:text-xl">
              {t("contacts.tabs.form")}
            </h2>
            <DemoForm />
          </motion.section>

          <motion.section
            variants={motionItem}
            role="tabpanel"
            id={panelDomId(ID_PREFIX, "links")}
            aria-labelledby={tabDomId(ID_PREFIX, "links")}
            className={panelClass("links")}
          >
            <h2 className="mb-4 hidden font-heading text-lg font-medium text-white lg:block lg:text-xl">
              {t("contacts.tabs.links")}
            </h2>
            <ContactLinks contactList={contactList} />
          </motion.section>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default ContactsPage;
