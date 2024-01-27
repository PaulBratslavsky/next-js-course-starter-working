"use client";
import { useFormState } from "react-dom";
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { registerUserAction } from "@/app/data/actions";
import Link from "next/link";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

function FieldError({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string) => (
    <div className="text-warning text-xs italic mt-1 py-2">{err}</div>
  ));
}

function StrapiErrors({ error }: { error: string }) {
  if (!error) return null;
  return <div className="text-warning text-xs italic py-2">{error}</div>;
}

export default function RegisterForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-base-200 px-6 pb-4 pt-8 my-6">
        <h1 className={"mb-3 text-2xl"}>Please register to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="input input-primary block w-full rounded-md py-[9px] pl-10 text-sm"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:" />
            </div>
            <FieldError error={formState.zodErrors?.username} />
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="input input-primary block w-full rounded-md py-[9px] pl-10 text-sm  "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:" />
            </div>
            <FieldError error={formState.zodErrors?.email} />
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="input input-primary block w-full rounded-md py-[9px] pl-10 text-sm  "
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:" />
            </div>
            <FieldError error={formState.zodErrors?.password} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button className="btn btn-primary w-56 my-6" type="submit">
            <ArrowRightIcon className="h-5 w-5" /> Signup
          </button>
          <Link className="text-muted" href="/login">
            Have an account? Login
          </Link>
        </div>
        <StrapiErrors error={formState.strapiErrors?.message} />
      </div>
    </form>
  );
}
