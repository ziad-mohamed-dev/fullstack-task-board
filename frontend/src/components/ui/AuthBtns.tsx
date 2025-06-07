"use client";
import { useAuth } from "@/stores/useAuth";
import { signOut } from "@/utils/clientApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthBtnsProps {
  initIsAuth: boolean;
}

const AuthBtns = ({ initIsAuth }: AuthBtnsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuth, setAuth } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      setAuth(false);
      setIsSigningOut(false);
      const isPublicRoute =
        ["/sign-in", "/sign-up"].some((publicRoute) =>
          pathname.startsWith(publicRoute)
        ) || pathname === "/";
      if (!isPublicRoute) {
        router.replace("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAuth(initIsAuth);
  }, [initIsAuth, setAuth]);

  if (isAuth === null) return;

  return (
    <div className="flex items-center gap-2">
      {isAuth ? (
        <button
          onClick={handleSignOut}
          className="bg-btn-primary text-white px-2 py-1 rounded-lg hover:brightness-90 transition duration-300 cursor-pointer flex gap-2 items-center"
        >
          {isSigningOut && (
            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          <span>Sign out</span>
        </button>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="bg-btn-primary text-white px-2 py-1 rounded-lg hover:brightness-90 transition duration-300 cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="bg-btn-primary text-white px-2 py-1 rounded-lg hover:brightness-90 transition duration-300 cursor-pointer"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthBtns;
