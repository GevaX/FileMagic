import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "@/src/components/ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="bg-background fixed z-50 flex h-24 w-full items-center justify-between bg-opacity-30 px-4 py-10 backdrop-blur-md md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Link href="/">
        <Image
          alt="logo"
          className="w-35 mb-2 cursor-pointer dark:invert"
          src="/logoB.svg"
          height={100}
          width={170}
        />
      </Link>
      <ThemeSwitch />
    </nav>
  );
}
