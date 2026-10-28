export type Contact = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
};

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
