"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBer = () => {
  const pathname = usePathname();

  // Active link 
  const navLinks = (
    <>
      <li>
        <Link 
          href="/" 
          className={`hover:bg-transparent rounded-none px-1 py-2 ${pathname === "/" ? "text-[#4338CA] font-bold border-b-2 border-[#4338CA]" : "text-gray-700 font-medium hover:text-[#4338CA]"}`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
          href="/explore-cars" 
          className={`hover:bg-transparent rounded-none px-1 py-2 ${pathname === "/explore-cars" ? "text-[#4338CA] font-bold border-b-2 border-[#4338CA]" : "text-gray-700 font-medium hover:text-[#4338CA]"}`}
        >
          Explore Cars
        </Link>
      </li>
      <li>
        <Link 
          href="/about" 
          className={`hover:bg-transparent rounded-none px-1 py-2 ${pathname === "/about" ? "text-[#4338CA] font-bold border-b-2 border-[#4338CA]" : "text-gray-700 font-medium hover:text-[#4338CA]"}`}
        >
          About
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#FBFAFF] w-full border-b border-gray-100 sticky top-0 z-50">
      <nav className="navbar container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
       
       
      {/* 1. Left Side: Brand Logo  */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-3 group">
            
            {/*  Logo Icon */}
            <div className="bg-linear-to-br from-[#4338CA] to-[#14B8A6] p-2.5 rounded-full text-white shadow-[0_4px_12px_rgba(67,56,202,0.3)] group-hover:shadow-[0_6px_16px_rgba(67,56,202,0.4)] group-hover:scale-105 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v1a2 2 0 01-2 2h-1m-14-5a2 2 0 00-2 2v1a2 2 0 002 2h1m14-5l-1.5-4.5A2 2 0 0015.6 5h-7.2a2 2 0 00-1.9 1.5L5 11m14 5h-1m-12 0H5m12 0a2 2 0 11-4 0m-8 0a2 2 0 114 0" />
              </svg>
            </div>

            {/* Brand Name */}
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-[#4338CA]">Ride</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#14B8A6]">Vault</span>
            </span>
          </Link>
        </div>

        {/* 2. Middle Side: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-base">
            {navLinks}
          </ul>
        </div>

        {/* 3. Right Side: Auth Buttons & Mobile Menu */}
        <div className="navbar-end gap-2 md:gap-4">
          
          {/* Desktop Auth Buttons (Hidden on Mobile) */}
          <div className="hidden md:flex gap-4 items-center">
            <Link 
              href="/login" 
              className="px-6 py-2 rounded border-2 border-[#4338CA] text-[#4338CA] font-bold text-sm hover:bg-[#4338CA] hover:text-white transition"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 rounded text-white font-bold text-sm bg-linear-to-r from-[#4338CA] via-[#3B82F6] to-[#14B8A6] hover:opacity-90 transition shadow-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Menu (Right aligned) */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#4338CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-1 p-4 shadow-lg bg-white rounded-box w-56 gap-3 border border-gray-100">
              {navLinks}
              
              {/* Mobile Auth Buttons (Sign In + Sign Up) */}
              <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-gray-100">
                <Link href="/login" className="btn btn-outline border-[#4338CA] text-[#4338CA] hover:bg-[#4338CA] hover:text-white btn-sm rounded-full w-full">
                  Sign In
                </Link>
                <Link href="/register" className="btn border-none text-white bg-linear-to-r from-[#4338CA] via-[#3B82F6] to-[#14B8A6] hover:opacity-90 btn-sm rounded-full w-full">
                  Sign Up
                </Link>
              </div>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default NavBer;