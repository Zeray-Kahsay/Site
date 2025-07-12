"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  if (!isMounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <nav className="bg-indigo-500 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold font-serif tracking-widest"
        >
          SITE
        </Link>

        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>

        <div className="md:flex items-center space-x-6 hidden">
          <Link href="/" className="hover:underline font-serif tracking-widest">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:underline font-serif tracking-widest"
          >
            About
          </Link>

          {!userData?.userName && (
            <>
              <Link
                href="/auth/register"
                className="hover:underline font-serif tracking-widest"
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="hover:underline font-serif tracking-widest"
              >
                Login
              </Link>
            </>
          )}

          {userData?.userName && (
            <>
              <button
                onClick={handleLogout}
                className="hover:underline font-serif tracking-widest bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
              <Link
                href="/profile"
                className="hover:underline font-serif tracking-widest"
              >
                {userData.userName.toUpperCase()}
              </Link>
            </>
          )}

          {userData?.role === "Admin" && (
            <Link
              href="/admin"
              className="hover:underline font-serif tracking-widest"
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className=" flex flex-col items-start mt-4 md:hidden space-y-2 bg-blue-700 p-4">
          <Link
            href="/profile"
            className="hover:underline font-serif tracking-widest"
            onClick={toggleMenu}
          >
            {userData?.userName?.toUpperCase()}
          </Link>

          <Link
            href="/"
            className="hover:underline font-serif tracking-widest"
            onClick={toggleMenu}
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:underline font-serif tracking-widest"
            onClick={toggleMenu}
          >
            About
          </Link>

          {!userData?.userName && (
            <>
              <Link
                href="/auth/register"
                className="hover:underline font-serif tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="hover:underline font-serif tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </>
          )}

          {userData?.role === "Admin" && (
            <Link
              href="/admin"
              className="hover:underline font-serif tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}

          {userData?.userName && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:underline font-serif tracking-widest bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
