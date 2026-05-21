"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { BiMap, BiHistory, BiCreditCard } from "react-icons/bi";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiEnvelope, BiLockAlt, BiErrorCircle } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
 
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: credentials.email,
      password: credentials.password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        `Login Failed: ${error.message || "Invalid email or password"}`,
        { icon: <BiErrorCircle className="text-red-500 size-5" /> }
      );
      return;
    }

    if (data) {
      toast.success("Welcome back to RideVault! 🚗");
     window.location.href = "/";
    }
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-slate-50 py-10 px-4 md:px-8 font-sans">
      
      
      <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-200/40 bg-white">
        
        {/* Left Side: Premium Car Branding */}
        <div className="w-full lg:w-1/2 relative bg-[#F8FAFC] min-h-87.5 lg:min-h-150 flex flex-col justify-between overflow-hidden p-8 lg:p-12 group">
          
          {/* Subtle background abstract shapes */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-slate-100 to-indigo-50/30 z-0"></div>
          
          {/* Text & Features Content */}
          <div className="relative z-20 mt-2 text-center lg:text-left grow">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2"
            >
              Welcome <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-500">Back.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-sm leading-relaxed max-w-70 mx-auto lg:mx-0 mb-8"
            >
              Sign in to access your dashboard, manage bookings, and explore new rides.
            </motion.p>

            {/* NEW: Returning User Features (Fills the empty space) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex flex-col gap-5 max-w-[320px] mx-auto lg:mx-0"
            >
              {[
                { icon: BiMap, title: "Track Your Rides", desc: "Real-time updates on your current bookings." },
                { icon: BiHistory, title: "Booking History", desc: "Easily view and re-book your favorite cars." },
                { icon: BiCreditCard, title: "Seamless Payments", desc: "Manage your payment methods securely." }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group/feature">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 group-hover/feature:bg-indigo-600 group-hover/feature:text-white transition-colors duration-300">
                    <feature.icon size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[14px] font-bold text-slate-800 leading-none mb-1">{feature.title}</h4>
                    <p className="text-[12px] text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Main Car Image - Adjusted for better spacing */}
          <div className="relative w-full h-45 sm:h-55 lg:h-65 z-10 flex items-center justify-center mt-6 lg:mt-4">
            <Image
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop"
              alt="Premium Dark Sports Car"
              fill
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transform transition-transform duration-1000 group-hover:scale-105" 
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Floating Security Badge */}
          <div className="relative z-20 flex items-center justify-center lg:justify-start gap-3 bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-2xl w-max mx-auto lg:mx-0 shadow-sm mt-4">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              <BiLockAlt size={16} />
            </div>
            <div className="text-slate-800 text-left">
              <p className="text-xs font-bold leading-tight">Secure Login</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-tight">Encrypted connection</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative z-10">
          
          {/* Form Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="mt-2 text-slate-500 text-[15px]">
              Enter your details to proceed.
            </p>
          </div>

          <Form className="flex flex-col gap-5 w-full max-w-sm mx-auto lg:mx-0" onSubmit={onSubmit}>
            
            {/* Email Address */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              className="w-full"
            >
              <Label className="mb-1.5 text-sm font-bold text-slate-700">
                Email Address
              </Label>
              <InputGroup className="rounded-xl bg-slate-50/50 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-sm">
                <InputGroup.Prefix className="pl-3.5">
                  <BiEnvelope className="size-4.5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your email address"
                  className="bg-transparent py-3 text-[15px] text-slate-900 font-medium"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-500 mt-1 pl-1 font-medium" />
            </TextField>

            {/* Password */}
            <TextField
              className="w-full"
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6)
                  return "Password must be at least 6 characters.";
                if (!/[A-Z]/.test(value))
                  return "Include at least one uppercase letter.";
                if (!/[a-z]/.test(value))
                  return "Include at least one lowercase letter.";
                if (!/[0-9]/.test(value)) return "Include at least one number.";
                return null;
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm font-bold text-slate-700">
                  Password
                </Label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-teal-600 transition-colors">
                  Forgot Password?
                </a>
              </div>
              
              <InputGroup className="rounded-xl bg-slate-50/50 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-sm">
                <InputGroup.Prefix className="pl-3.5">
                  <BiLockAlt className="size-4.5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your password"
                  className="bg-transparent py-3 text-[15px] text-slate-900 font-medium tracking-wide"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-1.5">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <BsEye className="size-4" />
                    ) : (
                      <BsEyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-red-500 mt-1 pl-1 font-medium" />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-4 w-full rounded-xl bg-linear-to-r from-indigo-600 to-teal-500 py-6 text-[15px] font-bold text-white shadow-[0_8px_15px_rgba(67,56,202,0.2)] hover:shadow-[0_12px_25px_rgba(67,56,202,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-8 max-w-sm mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <Button
            onClick={signinWithGoogle}
            variant="outline"
            className="flex w-full max-w-sm mx-auto lg:mx-0 items-center justify-center gap-3 rounded-xl border-2 border-slate-100 bg-white py-6 text-[15px] font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-200 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="size-5" />
            Sign in with Google
          </Button>

          {/* Footer Link */}
          <p className="mt-10 text-center lg:text-left text-[15px] text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-bold text-indigo-600 hover:text-teal-600 transition-colors ml-1"
            >
              Sign Up <FaArrowRight size={12} className="inline ml-1 -mt-0.5" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;