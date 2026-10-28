/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USER: string;
  readonly VITE_LINKEDIN_USER: string;
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE_NUMBER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
