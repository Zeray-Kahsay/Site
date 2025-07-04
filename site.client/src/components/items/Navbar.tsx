"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // or use Heroicons
import clsx from "clsx";
import { useAppSelector } from "@/store/store";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // avoid hydration mismatch

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
            <Link href="/" className="text-xl font-bold text-blue-600">
                SITE
            </Link>

            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                className={clsx(
                    "md:flex md:items-center gap-4",
                    isOpen ? "block mt-4" : "hidden",
                    "md:mt-0"
                )}
            >
                <Link href="/items" className="text-gray-700 hover:text-blue-600">
                    Items
                </Link>

                {!user ? (
                    <>
                        <Link href="/auth/register" className="text-gray-700 hover:text-blue-600">
                            Register
                        </Link>
                        <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                    </>
                ) : (
                    <span className="text-sm font-medium text-green-600">
                        {user.phoneNumber}
                    </span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
