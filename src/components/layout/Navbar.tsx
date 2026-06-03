"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useSearchStore } from "@/store/search-store";

import { useState } from "react";

export default function Navbar() {

  const { open } =
    useSearchStore();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (

    <>

      {/* NAVBAR */}

      <header
        className="
          fixed
          top-0
          left-0
          w-full
          z-50
          backdrop-blur-xl
          bg-black/20
          border-b
          border-white/10
          animate-in
          fade-in
          slide-in-from-top-10
          duration-700
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            py-3
            sm:py-5
            grid
            grid-cols-3
            md:flex
            md:items-center
            md:justify-between
          "
        >

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center justify-start md:hidden">
            <button
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="
                text-white
                p-1
                -ml-1
              "
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* LOGO */}
          <div className="flex items-center justify-center md:justify-start">
            <Link
              href="/"
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-black
                tracking-wide
                text-white
              "
            >
              <Image 
                src="/logo-main.png" 
                alt="Charukala" 
                width={160} 
                height={40} 
                className="w-auto h-7 sm:h-9 md:h-10 object-contain" 
                priority
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}

          <nav
            className="
              hidden
              md:flex
              items-center
              gap-6
              lg:gap-10
            "
          >

            <Link
              href="/products"
              className="
                text-white/80
                hover:text-white
                transition
                text-sm
                lg:text-base
              "
            >
              Collections
            </Link>

            <Link
              href="/orders"
              className="
                text-white/80
                hover:text-white
                transition
                text-sm
                lg:text-base
              "
            >
              Orders
            </Link>

            <Link
              href="/about"
              className="
                text-white/80
                hover:text-white
                transition
                text-sm
                lg:text-base
              "
            >
              Heritage
            </Link>

            <Link
              href="/contact"
              className="
                text-white/80
                hover:text-white
                transition
                text-sm
                lg:text-base
              "
            >
              Contact
            </Link>

          </nav>

          {/* ACTIONS */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              sm:gap-5
            "
          >

            {/* SEARCH */}

            <button

              onClick={open}

              className="
                text-white/80
                hover:text-white
                transition
                p-1
              "
              aria-label="Search"
            >

              <Search size={18} className="sm:w-5 sm:h-5" />

            </button>

            {/* WISHLIST */}

            <Link
              href="/wishlist"
              className="
                text-white/80
                hover:text-white
                transition
                p-1
              "
              aria-label="Wishlist"
            >

              <Heart size={18} className="sm:w-5 sm:h-5" />

            </Link>

            {/* CART */}

            <Link
              href="/cart"
              className="
                relative
                text-white/80
                hover:text-white
                transition
                p-1
              "
              aria-label="Cart"
            >

              <ShoppingBag size={18} className="sm:w-5 sm:h-5" />

              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  bg-[#9b174c]
                  text-white
                  text-[9px]
                  sm:text-[10px]
                  h-3.5
                  w-3.5
                  sm:h-4
                  sm:w-4
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>

            </Link>

            {/* PROFILE */}

            <Link
              href="/profile"
              className="
                hidden
                md:block
                text-white/80
                hover:text-white
                transition
                p-1
              "
              aria-label="Profile"
            >

              <User size={20} />

            </Link>

          </div>

        </div>

      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {

          mobileMenuOpen && (

            <>

              {/* BACKDROP */}

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
                  z-[99]
                  bg-black/50
                "
              />

              {/* MENU PANEL */}

              <motion.div

                initial={{
                  opacity: 0,
                  x: "-100%"
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                exit={{
                  opacity: 0,
                  x: "-100%"
                }}

                transition={{
                  duration: 0.4,
                  ease: "easeOut"
                }}

                className="
                  fixed
                  inset-y-0
                  left-0
                  z-[100]
                  w-[85vw]
                  max-w-[360px]
                  bg-[#111111]
                  text-white
                  flex
                  flex-col
                  px-6
                  sm:px-8
                  py-6
                  sm:py-8
                  overflow-y-auto
                "
              >

                {/* TOP */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-10
                  "
                >

                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                    "
                  >
                    <Image 
                      src="/logo-main.png" 
                      alt="Charukala" 
                      width={150} 
                      height={40} 
                      className="w-auto h-8 sm:h-10 object-contain" 
                    />
                  </h2>

                  <button

                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    aria-label="Close menu"

                  >

                    <X size={26} />

                  </button>

                </div>

                {/* LINKS */}

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    sm:gap-8
                  "
                >

                  <Link
                    href="/products"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Collections
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Wishlist
                  </Link>

                  <Link
                    href="/virtual-tryon"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Virtual Try-On
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Orders
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Contact
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      text-2xl
                      sm:text-3xl
                      font-black
                      hover:text-[#f3c46b]
                      transition
                    "
                  >
                    Profile
                  </Link>

                </div>

              </motion.div>

            </>

          )

        }

      </AnimatePresence>

    </>

  );

}