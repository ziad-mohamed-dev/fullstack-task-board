import { logo } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthBtns from "./AuthBtns";
import { verifyToken } from "@/utils/serverApi";

const Header = async () => {
  let isAuth: boolean;

  try {
    await verifyToken();
    isAuth = true;
  } catch {
    isAuth = false;
  }

  return (
    <header className="sticky top-0 shadow bg-white">
      <div className="max-w-2xl mx-auto py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={40} height={40} />
          <h1 className="text-2xl text-text-primary">Go Task</h1>
        </Link>
        <AuthBtns initIsAuth={isAuth} />
      </div>
    </header>
  );
};

export default Header;
