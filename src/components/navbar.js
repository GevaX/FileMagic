import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "@/src/components/ThemeSwitch"

export default function Navbar() {
    return (
        <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-background bg-opacity-30 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Link href="/">
                <Image
                    alt="logo"
                    className="mb-2 cursor-pointer w-35 dark:invert"
                    src="/logoB.svg"
                    height={100}
                    width={170}
                />
            </Link>
            <ThemeSwitch />
        </nav>
    );
}