"use client";
import { SignUpFormField, SignUpSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAccountCircle, MdEmail, MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import ErrorMessage from "../_components/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { url } from "inspector";
import Image from "next/image";

interface CloudnaryResult {
  url: string;
}
const SignUp = () => {
  const router = useRouter();
  const [publicId, setPublicId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormField>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpFormField> = async (data) => {
    const body = { ...data, image: publicId };
    const res = await fetch("/api/auth/users/new", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if (response.error) {
      toast.error(response.error);
      return;
    }

    router.push("/auth/signin");
  };

  return (
    <form
      className="flex flex-col gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Sign Up</h1>
      </div>

      <div className="flex justify-center">
        <CldUploadWidget
          uploadPreset="g2dueo8c"
          onSuccess={(results) => {
            console.log("=================results===================");
            console.log(results);
            console.log("====================================");
            const { url } = results.info as CloudnaryResult;
            setPublicId(url);
          }}
        >
          {({ open }) => {
            return (
              <div
                role="button"
                className="avatar w-20 h-20"
                onClick={() => open()}
              >
                <Image
                  className="rounded-full border-2 border-black"
                  src="/account.svg"
                  alt="User avatar"
                  width={20}
                />
                {publicId && (
                  <Image
                    className="rounded-full border-2 border-black absolute hover:opacity-0 transition-opacity duration-300"
                    src={publicId || ""}
                    alt="User avatar"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            );
          }}
        </CldUploadWidget>
      </div>

      <label className="input input-bordered flex items-center gap-2">
        <MdAccountCircle size={20} />

        <input type="text" placeholder="Name..." {...register("name")} />
      </label>
      <ErrorMessage message={errors.name?.message!} />
      <label className="input input-bordered flex items-center gap-2">
        <MdEmail size={20} />
        <input
          type="text"
          className="grow"
          placeholder="Email..."
          {...register("email")}
        />
      </label>
      <ErrorMessage message={errors.email?.message!} />

      <label className="input input-bordered flex items-center gap-2">
        <RiLockPasswordFill size={20} />

        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
      </label>
      <ErrorMessage message={errors.password?.message!} />

      <Toaster />

      <button className="w-full btn btn-primary text-white" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
