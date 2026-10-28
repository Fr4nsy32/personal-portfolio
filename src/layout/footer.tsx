import { useTranslation } from "react-i18next";
import { version } from "@/../package.json";

const Footer: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="mt-auto py-4 text-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} Andi Sina · {t("footer.builtBy")}
      </p>
      <p>
        <a
          href={`https://www.github.com/${import.meta.env.VITE_GITHUB_USER}/personal-portfolio`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {t("footer.sourceCode")}
        </a>
        {" · "}v{version}
      </p>
    </footer>
  );
};

export default Footer;
