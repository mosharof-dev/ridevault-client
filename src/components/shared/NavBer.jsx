"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { BiMenuAltRight } from "react-icons/bi"; 
import Image from "next/image";

const NavBer = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // Reusable Nav Links (Active state a border bottom)
  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={`px-1 py-1 transition-all ${
            pathname === "/"
              ? "text-indigo-600 font-bold border-b-2 border-indigo-600 bg-transparent"
              : "text-slate-600 font-medium hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 bg-transparent"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/explore-cars"
          className={`px-1 py-1 transition-all ${
            pathname === "/explore-cars"
              ? "text-indigo-600 font-bold border-b-2 border-indigo-600 bg-transparent"
              : "text-slate-600 font-medium hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 bg-transparent"
          }`}
        >
          Explore Cars
        </Link>
      </li>
      <li>
        <Link
          href="/add-car"
          className={`px-1 py-1 transition-all ${
            pathname === "/add-car"
              ? "text-indigo-600 font-bold border-b-2 border-indigo-600 bg-transparent"
              : "text-slate-600 font-medium hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 bg-transparent"
          }`}
        >
          Add Car
        </Link>
      </li>
    </>
  );

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => window.location.reload() },
    });
  };

  return (
    <div className="bg-[#FBFAFF] w-full border-b border-gray-100 sticky top-0 z-100">
      <nav className="navbar container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        
        {/* Left Side: Brand Logo */}
        <div className="navbar-start w-auto lg:w-1/4">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="bg-linear-to-br from-[#4338CA] to-[#14B8A6] p-2.5 rounded-full text-white shadow-lg group-hover:shadow-indigo-500/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11H5m14 0a2 2 0 012 2v1a2 2 0 01-2 2h-1m-14-5a2 2 0 00-2 2v1a2 2 0 002 2h1m14-5l-1.5-4.5A2 2 0 0015.6 5h-7.2a2 2 0 00-1.9 1.5L5 11m14 5h-1m-12 0H5m12 0a2 2 0 11-4 0m-8 0a2 2 0 114 0" />
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight">
              <span className="text-indigo-700">Ride</span>
              <span className="text-teal-500">Vault</span>
            </span>
          </Link>
        </div>

        {/* Middle Side: Centered Links (Desktop Only) */}
        <div className="navbar-center hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 text-[15px]">
            {navLinks}
          </ul>
        </div>

        {/* Right Side: Auth & Mobile Menu */}
        <div className="navbar-end w-auto lg:w-1/4 flex justify-end gap-2 ml-auto">
          
          {/* ----- DESKTOP AUTH / PROFILE ----- */}
          <div className="hidden lg:block">
            {isPending ? (
              <div className="w-10 h-10 rounded-full animate-pulse bg-slate-200"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-transparent">
                  <div className="w-11 rounded-full border-2 border-indigo-600 hover:border-4 hover:border-indigo-400 outline-none transition-all ">
                    <Image
                      src={session.user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="Profile"
                      width={44}
                      height={44}
                      className="object-cover bg-white"
                    />
                  </div>
                </div>
                
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-200 p-2 shadow-xl bg-white rounded-2xl w-56 border border-slate-100 gap-1">
                  <li className="pointer-events-none mb-2">
                    <div className="flex flex-col items-start gap-0.5 px-2 pb-3 border-b border-slate-100 w-full hover:bg-transparent">
                      <span className="font-bold text-slate-900 text-[15px] truncate w-full">
                        {session.user.name}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate w-full">
                        {session.user.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link href="/add-car" className="text-slate-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 py-2.5">
                      Add Car
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-bookings" className="text-slate-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 py-2.5">
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-added-cars" className="text-slate-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 py-2.5">
                      My Added Cars
                    </Link>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    {/* Striking Neon Yellow Logout Button */}
                    <button 
                      onClick={handleLogout} 
                      className="flex justify-center text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-xl py-3 w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="px-6 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">
                  Sign In
                </Link>
                <Link href="/register" className="px-6 py-2.5 rounded-xl text-white font-bold text-sm bg-linear-to-r from-indigo-600 to-teal-500 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* ----- MOBILE MENU (Hamburger on the right) ----- */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-indigo-600">
              <BiMenuAltRight size={28} />
            </div>

            <ul tabIndex={0} className="menu dropdown-content mt-3 z-200 p-4 shadow-xl bg-white rounded-2xl w-64 border border-slate-100 gap-2">
              {!isPending && session && (
                <li className="pointer-events-none mb-2">
                  <div className="flex items-center gap-3 px-2 pb-4 border-b border-slate-100 w-full hover:bg-transparent">
                    <div className="avatar">
                      <div className="w-10 rounded-full border-2 border-indigo-600">
                        <Image
                          src={session.user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-slate-900 text-sm truncate">{session.user.name}</span>
                      <span className="text-[11px] text-slate-500 truncate">{session.user.email}</span>
                    </div>
                  </div>
                </li>
              )}

              {/* Mobile links  */}
              <div className="flex flex-col gap-3 px-2">
                {navLinks}
              </div>

              <div className="divider my-1"></div>

              {isPending ? (
                <div className="animate-pulse h-10 bg-slate-100 rounded-xl w-full"></div>
              ) : session ? (
                <>
                  <li><Link href="/add-car" className="text-slate-700 font-medium py-2">Add Car</Link></li>
                  <li><Link href="/my-bookings" className="text-slate-700 font-medium py-2">My Bookings</Link></li>
                  <li><Link href="/my-added-cars" className="text-slate-700 font-medium py-2">My Added Cars</Link></li>
                  <li>
                   
                    <button 
                      onClick={handleLogout} 
                      className="flex justify-center text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-xl py-3 w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link href="/login" className="flex justify-center border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl py-2 w-full">Sign In</Link></li>
                  <li><Link href="/register" className="mt-2 flex justify-center bg-linear-to-r from-indigo-600 to-teal-500 text-white font-bold rounded-xl py-2 w-full">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default NavBer;