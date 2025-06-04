import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-6">{children}</div>
  );
};

export default AuthLayout;
