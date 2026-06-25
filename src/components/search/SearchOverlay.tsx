"use client";

import { useSearchStore } from "@/store/search-store";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const demoProducts = [
  { id: 1, name: "Banarasi Silk Saree", slug: "banarasi-silk-saree" },
  { id: 2, name: "Kanjivaram Bridal Saree", slug: "kanjivaram-bridal-saree" },
  { id: 3, name: "Festival Silk Collection", slug: "festival-silk-collection" },
];

export default function SearchOverlay() {
  const { isOpen, close } = useSearchStore();
  const [query, setQuery] = useState("");

  const filtered = demoProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-100 bg-[#F8F3EA]/95 backdrop-blur-md"
        >
          {/* CLOSE */}
          <button
            onClick={close}
            className="absolute top-8 right-8 text-[#2A2A2A] hover:text-[#7A0019] transition duration-300"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* CONTENT */}
          <div className="max-w-4xl mx-auto pt-32 px-6">
            <p className="section-tag mb-4">Search Collections</p>
            
            {/* INPUT */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="
                  w-full
                  bg-transparent
                  border-b
                  border-[#E8DCC4]
                  text-[#2A2A2A]
                  font-brand
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  outline-none
                  pb-6
                  placeholder:text-[#2A2A2A]/20
                  transition
                  focus:border-[#7A0019]
                "
                autoFocus
              />
            </div>

            {/* RESULTS */}
            <div className="mt-16 space-y-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={close}
                  className="
                    block
                    font-brand
                    text-3xl
                    sm:text-4xl
                    text-[#2A2A2A]
                    hover:text-[#7A0019]
                    transition
                    duration-300
                  "
                >
                  {product.name}
                </Link>
              ))}

              {query && filtered.length === 0 && (
                <p className="text-[#6B6B6B] text-xl font-body">
                  No collections found for &quot;{query}&quot;
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
