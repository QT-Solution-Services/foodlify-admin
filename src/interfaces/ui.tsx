export interface ButtonProps {
  type: string;
  bgc: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode; // The content inside the button
  onClick?: (e: any) => void; // Optional click event handler
  className?: string;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export interface AppNavProps {
  pageTitle?: string;
}

export interface SideLinkProps {
  children: React.ReactNode;
  to: string;
}

export interface LoginFormProps {
  username: string;
  password: string;
}
