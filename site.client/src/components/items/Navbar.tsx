"use client";

import { useState } from "react";
import { Link, Menu } from "react-feather";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

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
        <div className="mt-4 md:hidden space-y-2 bg-blue-700 p-4">
          <Link
            href="/profile"
            className="hover:underline font-serif tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            {userData?.userName ? userData?.userName?.toUpperCase() : "Profile"}
          </Link>

          <Link
            href="/"
            className="hover:underline font-serif tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:underline font-serif tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {!userData?.userName && (
            <>
              <Link
                href="/register"
                className="hover:underline font-serif tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
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

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu, X } from "lucide-react"; // or use Heroicons
// import clsx from "clsx";
// import { useAppSelector } from "@/store/store";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const user = useAppSelector((state) => state.auth.user);

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null; // avoid hydration mismatch

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   return (
//     <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
//       <Link href="/" className="text-xl font-bold text-blue-600">
//         SITE
//       </Link>

//       <div className="md:hidden">
//         <button onClick={toggleMenu}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       <div
//         className={clsx(
//           "md:flex md:items-center gap-4",
//           isOpen ? "block mt-4" : "hidden",
//           "md:mt-0"
//         )}
//       >
//         <Link href="/items" className="text-gray-700 hover:text-blue-600">
//           Items
//         </Link>

//         {!user?.phoneNumber ? (
//           <>
//             <Link
//               href="/auth/register"
//               className="text-gray-700 hover:text-blue-600"
//             >
//               Register
//             </Link>
//             <Link
//               href="/auth/login"
//               className="text-gray-700 hover:text-blue-600"
//             >
//               Login
//             </Link>
//           </>
//         ) : (
//           <span className="text-sm font-medium text-green-600">
//             {user.userName}
//           </span>
//         )}
//       </div>
//     </nav>
//   );

// return (
//   <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
//     <Link href="/" className="text-xl font-bold text-blue-600">
//       SITE
//     </Link>

//     <div className="md:hidden">
//       <button onClick={toggleMenu}>
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>
//     </div>

//     <div
//       className={clsx(
//         "md:flex md:items-center gap-4",
//         isOpen ? "block mt-4" : "hidden",
//         "md:mt-0"
//       )}
//     >
//       <Link href="/items" className="text-gray-700 hover:text-blue-600">
//         Items
//       </Link>

//       {!user?.phoneNumber ? (
//         <>
//           <Link
//             href="/auth/register"
//             className="text-gray-700 hover:text-blue-600"
//           >
//             Register
//           </Link>
//           <Link
//             href="/auth/login"
//             className="text-gray-700 hover:text-blue-600"
//           >
//             Login
//           </Link>
//         </>
//       ) : (
//         <span className="text-sm font-medium text-green-600">
//           {user.userName}
//         </span>
//       )}
//     </div>
//   </nav>
// );
//};
