import Link from "next/link";

// Buraya kendi linklerini koy
const footerLinks = [
  { label: "Hakkında", href: "#" },
  { label: "Gizlilik", href: "#" },
  { label: "İletişim", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          LOGO
        </Link>

        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} LOGO. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
