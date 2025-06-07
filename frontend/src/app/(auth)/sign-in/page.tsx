"use client";
import Input from "@/components/ui/Input";
import { useAuth } from "@/stores/useAuth";
import { signIn } from "@/utils/clientApi";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  username: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const [signinData, setSigninData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // RealTime validation after the first submit
  useEffect(() => {
    if (isSubmitted) {
      validateForm(signinData);
      setInvalidCredentials(false);
    }
  }, [isSubmitted, signinData]);

  const validateForm = ({ username, password }: FormData) => {
    const newErrors = { username: "", password: "" };
    let isVaild = true;

    // Username validation
    if (!username.trim()) {
      newErrors.username = "username is required";
      isVaild = false;
    } else if (username.trim().length < 3) {
      newErrors.username = "username must be at least 3 characters";
      isVaild = false;
    }

    // password validation
    if (!password) {
      newErrors.password = "password is required";
      isVaild = false;
    } else if (password.length < 6) {
      newErrors.password = "pasword must be at least 6 characters";
      isVaild = false;
    }

    setErrors(newErrors);
    return isVaild;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm(signinData)) {
      const { username, password } = signinData;
      setIsLoading(true);
      try {
        await signIn({ username, password });
        router.replace("/boards");
        setAuth(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error === "Invalid credentials") {
            setInvalidCredentials(true);
          }
        } else {
          console.error("An unexpected error occurred", err);
        }
      }
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl rounded-2xl p-6 space-y-5 w-full max-w-lg"
    >
      <h1 className="text-center text-4xl">Sign in</h1>
      <Input
        label="Username"
        placeholder="Enter your username"
        onChange={handleChange}
        value={signinData.username}
        name="username"
        errorMsg={errors.username}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        onChange={handleChange}
        value={signinData.password}
        name="password"
        errorMsg={errors.password}
      />
      <div className="flex flex-col items-center gap-2">
        {invalidCredentials && (
          <p className="text-sm text-red-500">Invalid credentials</p>
        )}
        <div>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
        {isLoading ? (
          <div className="border-4 border-border border-t-transparent rounded-full size-10 animate-spin"></div>
        ) : (
          <button
            type="submit"
            className="bg-btn-primary hover:brightness-90 transition duration-150 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </form>
  );
};

export default Signin;
