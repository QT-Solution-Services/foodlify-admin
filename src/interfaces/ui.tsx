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
  SeachType?: React.ReactNode;
}

export interface AppNavProps {
  pageTitle?: string;
  SeachType?: React.ReactNode;
}

export interface SideLinkProps {
  children: React.ReactNode;
  to: string;
}

export interface LoginFormProps {
  username: string;
  password: string;
}

export interface NavItemProps {
  to: string;
  imgsrc: string;
  children: React.ReactNode;
}
