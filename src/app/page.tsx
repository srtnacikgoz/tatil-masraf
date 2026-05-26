"use client";

import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";

const stack = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "motion",
  "gsap",
];

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex max-w-xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <CircleCheck
            className="h-14 w-14 text-neutral-900 dark:text-neutral-100"
            strokeWidth={1.5}
          />
        </motion.div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-100">
          Template Hazır
        </h1>

        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Geliştirmeye başlayabilirsin. Bu sayfa{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            src/app/page.tsx
          </code>{" "}
          dosyasından geliyor — düzenle ve kendi sayfanı yap.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {stack.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.05, ease: "easeOut" }}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
