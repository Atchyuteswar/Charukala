"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || "/";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signIn(
        "credentials",
        {
          redirect: false,
          email,
          password,
          callbackUrl,
        }
      );

      if (res?.error) {
        setError(
          "Invalid email or password"
        );
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(
        "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
      min-h-screen
      bg-[#FDFBF7]
      flex
      flex-col
      items-center
      justify-center
      p-6
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-xl
        shadow-sm
        border
        border-[#E8DCC4]
        "
      >
        <div
          className="
          flex
          justify-center
          mb-8
          "
        >
          <Link href="/">
            <Image
              src="/logo-main.png"
              alt="Charukala"
              width={200}
              height={50}
              className="
              h-12
              w-auto
              object-contain
              "
            />
          </Link>
        </div>

        <h1
          className="
          text-2xl
          font-brand
          text-[#2A2A2A]
          mb-6
          text-center
          "
        >
          Welcome Back
        </h1>

        {error && (
          <div
            className="
            bg-red-50
            text-red-600
            p-3
            rounded-md
            mb-6
            text-sm
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-[#2A2A2A]
              mb-1
              "
            >
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-[#E8DCC4]
              rounded-md
              px-4
              py-2.5
              focus:outline-none
              focus:border-[#7A0019]
              transition-colors
              "
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-[#2A2A2A]
              mb-1
              "
            >
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-[#E8DCC4]
              rounded-md
              px-4
              py-2.5
              focus:outline-none
              focus:border-[#7A0019]
              transition-colors
              "
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            btn-primary
            py-3
            flex
            items-center
            justify-center
            mt-2
            "
          >
            {loading ? (
              <Loader2
                className="animate-spin"
                size={20}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div
          className="
          mt-6
          text-center
          text-sm
          text-[#6B6B6B]
          "
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="
            text-[#7A0019]
            hover:underline
            "
          >
            Register here
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}