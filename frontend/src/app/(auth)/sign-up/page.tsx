"use client";
import Input from "@/components/ui/Input";
import { useAuth } from "@/stores/useAuth";
import { signUp } from "@/utils/clientApi";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const [signupData, setSignupData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // RealTime validation after the first submit
  useEffect(() => {
    if (isSubmitted) {
      validateForm(signupData);
    }
  }, [isSubmitted, signupData]);

  const validateForm = ({ username, confirmPassword, password }: FormData) => {
    const newErrors = { username: "", password: "", confirmPassword: "" };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      newErrors.username = "username is required";
      isValid = false;
    } else if (username.trim().length < 3) {
      newErrors.username = "username must be at least 3 characters";
      isValid = false;
    }
    // password validation
    if (!password) {
      newErrors.password = "password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "pasword must be at least 6 characters";
      isValid = false;
    }

    // confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm(signupData)) {
      const { username, password } = signupData;
      setIsLoading(true);
      try {
        await signUp({ username, password });
        setAuth(true);
        router.replace("/boards");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error === "Username already exists") {
            setErrors((prev) => ({
              ...prev,
              username: "username already exists",
            }));
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
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl rounded-2xl p-6 space-y-5 w-full max-w-lg"
    >
      <h1 className="text-center text-4xl">Sign up</h1>
      <Input
        label="Username"
        placeholder="Enter your username"
        onChange={handleChange}
        value={signupData.username}
        name="username"
        errorMsg={errors.username}
      />
      <Input
        label="Password"
        placeholder="Enter password"
        onChange={handleChange}
        value={signupData.password}
        name="password"
        errorMsg={errors.password}
        type="password"
      />
      <Input
        label="Confirm password"
        placeholder="Confirm password"
        onChange={handleChange}
        value={signupData.confirmPassword}
        name="confirmPassword"
        errorMsg={errors.confirmPassword}
        type="password"
      />
      <div className="flex flex-col items-center gap-2">
        <div>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
        {isLoading ? (
          <div className="border-4 border-border border-t-transparent rounded-full size-10 animate-spin"></div>
        ) : (
          <button
            type="submit"
            className="bg-btn-primary hover:brightness-90 transition duration-150 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Sign up
          </button>
        )}
      </div>
    </form>
  );
};

export default Signup;
