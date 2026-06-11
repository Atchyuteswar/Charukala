"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-[#E8DCC4]">

        <h1 className="text-2xl font-brand text-[#2A2A2A] mb-6 text-center">
          Create an Account
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2A2A2A] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#E8DCC4] rounded-md px-4 py-2.5 focus:outline-none focus:border-[#7A0019] transition-colors"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A2A2A] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E8DCC4] rounded-md px-4 py-2.5 focus:outline-none focus:border-[#7A0019] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A2A2A] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E8DCC4] rounded-md px-4 py-2.5 focus:outline-none focus:border-[#7A0019] transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6B6B6B]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7A0019] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
