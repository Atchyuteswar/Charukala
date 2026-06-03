"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-[#F8F3EA]
          border-b
          border-[#E8DCC4]
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-20
            flex
            items-center
            justify-between
          "
        >
          {/* LEFT NAV */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-8
              flex-1
            "
          >
            <Link
              href="/"
              className="nav-link"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="nav-link"
            >
              Collections
            </Link>

            <Link
              href="/orders"
              className="nav-link"
            >
              Orders
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="
              lg:hidden
              text-[#2A2A2A]
            "
          >
            <Menu
              size={28}
              strokeWidth={1.5}
            />
          </button>

          {/* LOGO */}

          <Link
            href="/"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              flex
              items-center
              justify-center
            "
          >
            <Image
              src="/logo-main.png"
              alt="Charukala"
              width={420}
              height={90}
              priority
              className="
                hidden
                md:block
                h-[58px]
                w-auto
                object-contain
              "
            />

            <Image
              src="/logo-main.png"
              alt="Charukala"
              width={260}
              height={60}
              priority
              className="
                md:hidden
                h-[42px]
                w-auto
                object-contain
              "
            />
          </Link>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-5
              flex-1
            "
          >
            <Link
              href="/products"
              className="
                text-[#2A2A2A]
                hover:text-[#7A0019]
                transition
              "
            >
              <Search size={20} />
            </Link>

            <Link
              href="/profile"
              className="
                text-[#2A2A2A]
                hover:text-[#7A0019]
                transition
              "
            >
              <User size={20} />
            </Link>

            <Link
              href="/cart"
              className="
                relative
                text-[#2A2A2A]
                hover:text-[#7A0019]
                transition
              "
            >
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                fixed
                inset-0
                bg-black/30
                z-[90]
              "
            />

            <motion.div
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                fixed
                top-0
                left-0
                h-full
                w-[85%]
                max-w-[360px]
                bg-[#F8F3EA]
                z-[100]
                p-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-12
                "
              >
                <Image
                  src="/logo-main.png"
                  alt="Charukala"
                  width={180}
                  height={40}
                  className="
                    h-10
                    w-auto
                    object-contain
                  "
                />

                <button
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                >
                  <X
                    size={26}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <nav
                className="
                  flex
                  flex-col
                  gap-8
                "
              >
                <Link
                  href="/"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-2xl
                    font-brand
                  "
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-2xl
                    font-brand
                  "
                >
                  Collections
                </Link>

                <Link
                  href="/orders"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-2xl
                    font-brand
                  "
                >
                  Orders
                </Link>

                <Link
                  href="/profile"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-2xl
                    font-brand
                  "
                >
                  Profile
                </Link>

                <Link
                  href="/cart"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-2xl
                    font-brand
                  "
                >
                  Cart
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}