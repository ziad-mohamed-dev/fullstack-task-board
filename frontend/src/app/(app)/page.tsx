"use client";
import { hero_image } from "@/constants";
import { useAuth } from "@/stores/useAuth";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const { isAuth } = useAuth();
  return (
    <main className="max-w-2xl mx-auto py-14 px-6 space-y-12">
      <div className="space-y-4">
        <h1 className="text-6xl">
          An{" "}
          <span className="text-text-primary animate-fade-out">organized</span>{" "}
          day is a{" "}
          <span className="text-text-primary fade-out">successful</span> day
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Stay on top of your tasks, prioritize what matters, and boost your
          daily productivity with ease.
        </p>
        <Link
          href={isAuth ? "/boards" : "/sign-up"}
          className="px-4 py-2 text-2xl bg-btn-primary text-white rounded-lg"
        >
          Get Started
        </Link>
      </div>
      <div className="shadow-2xl rounded-2xl overflow-hidden border-2 border-border">
        <Image
          src={hero_image}
          alt="hero"
          width={600}
          height={600}
          priority
          className="object-center object-contain w-auto"
          style={{ width: "100%" }}
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </main>
  );
};

export default Home;
