import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-2xl mx-auto py-8 px-6 space-y-12">{children}</main>
  );
};

export default layout;
