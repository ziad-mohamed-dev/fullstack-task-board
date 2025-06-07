import RenderModal from "@/components/modals/RenderModal";
import Header from "@/components/ui/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <RenderModal />
    </>
  );
}
