"use client";
import { SignInFormField, SignInSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";
import ErrorMessage from "../_components/ErrorMessage";
import { signIn, SignInAuthorizationParams } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormField>({ resolver: zodResolver(SignInSchema) });

  const onSubmit: SubmitHandler<SignInFormField> = async (data) => {
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (result?.ok) {
      router.push(callbackUrl);
    } else {
      toast.error(result?.error!);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl });
  };

  const handleGithubSignIn = async () => {
    await signIn("github", { callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Sign In</h1>
            <h5 className="text-sm text-gray-400">
              Doesn&apos;t have an account yet?{" "}
              <Link
                href={`/auth/signup`}
                className="link text-blue-500 font-semibold"
              >
                Sign Up
              </Link>
            </h5>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <MdEmail size={20} />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email")}
            />
          </label>
          <ErrorMessage message={errors.email?.message!} />
          <label className="input input-bordered flex items-center gap-2">
            <RiLockPasswordFill size={20} />

            <input type="password" className="grow" {...register("password")} />
          </label>
          <ErrorMessage message={errors.password?.message!} />

          {error && <ErrorMessage message={error} />}
          <button className="w-full btn btn-primary text-white" type="submit">
            Continue
          </button>
        </div>
        <Toaster />
      </form>
      <div className="divider">or</div>

      <div className="flex flex-col gap-3">
        <button
          className="btn w-full text-md border-black border-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} className="mr-2" />
          Continue with Google
        </button>

        <button
          className="btn w-full text-md border-black border-2"
          onClick={handleGithubSignIn}
        >
          <FaGithub size={20} className="mr-2" />
          Continue with Gihub
        </button>
      </div>
    </div>
  );
};

export default SignIn;
