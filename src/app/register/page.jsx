

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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiUser, BiEnvelope, BiLockAlt, BiImageAdd } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

const SignUp = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.fullName,
      image: user.photoURL,
      email: user.email,
      password: user.password,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(
        `Registration Failed: ${error.message || "Something went wrong!"}`,
      );
      return;
    }

    if (data) {
      toast.success("Registration Successful! 🎉 Please login to continue.");
      await authClient.signOut();
      router.push("/login");
    }
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-slate-50 py-10 px-4 md:px-8 font-sans">
      
      {/* Main Container  */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-200/40 bg-white">
        
        {/* Left Side: Premium Dark Car Branding (Now 40% Width for better balance) */}
        <div className="w-full lg:w-5/12 relative bg-[#0B0D17] min-h-75 lg:min-h-full flex flex-col justify-between overflow-hidden p-10">
          
          {/* Subtle background abstract shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]"></div>
          
          {/* Text Content - Positioned at the top */}
          <div className="relative z-20 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm"
            >
              Start Your Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-3"
            >
              Join <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-400">RideVault</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-sm leading-relaxed"
            >
              Your key to premium automotive experiences. Rent your dream car seamlessly.
            </motion.p>
          </div>

          {/* Main Car Image - Centered and fully visible without cutting */}
          <div className="relative w-full h-62.5 lg:h-87.5 z-10 flex items-center justify-center">
            <Image
              
              src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop"
              alt="Premium Dark Sports Car"
              fill
              className="object-contain drop-shadow-2xl" 
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Floating Glass Badge - Positioned at bottom */}
          <div className="relative z-20 flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl w-max">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-teal-500/30">
              ★
            </div>
            <div className="text-white">
              <p className="text-xs font-bold leading-tight">Premium Fleet</p>
              <p className="text-[9px] text-slate-300 uppercase tracking-widest leading-tight">Verified Vehicles</p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form (Now 60% Width for relaxed spacing) */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-10">
          
          {/* Form Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-2 text-slate-500 text-[15px]">
              Join thousands of users who choose RideVault.
            </p>
          </div>

          <Form className="flex flex-col gap-5 max-w-lg mx-auto lg:mx-0 w-full" onSubmit={onSubmit}>
            
            {/* Full Name */}
            <TextField
              isRequired
              name="fullName"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters." : null
              }
              className="w-full"
            >
              <Label className="mb-1.5 text-sm font-bold text-slate-700">
                Full Name
              </Label>
              <InputGroup className="rounded-xl bg-slate-50/50 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-sm">
                <InputGroup.Prefix className="pl-3.5">
                  <BiUser className="size-4.5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your full name"
                  className="bg-transparent py-3 text-[15px] text-slate-900 font-medium"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-500 mt-1 pl-1 font-medium" />
            </TextField>

            {/* Photo URL */}
            <TextField
              isRequired
              name="photoURL"
              type="url"
              validate={(value) =>
                !/^https?:\/\/.*/i.test(value)
                  ? "Please enter a valid image link (https://...)"
                  : null
              }
              className="w-full"
            >
              <Label className="mb-1.5 text-sm font-bold text-slate-700">
                Photo URL
              </Label>
              <InputGroup className="rounded-xl bg-slate-50/50 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-sm">
                <InputGroup.Prefix className="pl-3.5">
                  <BiImageAdd className="size-4.5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="https://.../photo.jpg"
                  className="bg-transparent py-3 text-[15px] text-slate-900 font-medium"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-500 mt-1 pl-1 font-medium" />
            </TextField>

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
                  placeholder="Enter your email"
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
              <Label className="mb-1.5 text-sm font-bold text-slate-700">
                Password
              </Label>
              <InputGroup className="rounded-xl bg-slate-50/50 border border-slate-200 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-sm">
                <InputGroup.Prefix className="pl-3.5">
                  <BiLockAlt className="size-4.5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Create a strong password"
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
              className="mt-4 w-full rounded-xl bg-linear-to-r from-indigo-600 to-teal-500 py-6 text-[15px] font-bold text-white shadow-[0_8px_15px_rgba(67,56,202,0.2)] hover:shadow-[0_12px_25px_rgba(67,56,202,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Account
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-8 max-w-lg mx-auto lg:mx-0 w-full">
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
            className="flex w-full max-w-lg mx-auto lg:mx-0 items-center justify-center gap-3 rounded-xl border-2 border-slate-100 bg-white py-6 text-[15px] font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-200 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="size-5" />
            Sign Up with Google
          </Button>

          {/* Footer Link */}
          <p className="mt-10 text-center lg:text-left text-[15px] text-slate-500 font-medium">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-indigo-600 hover:text-teal-600 transition-colors ml-1"
            >
              Sign In <FaArrowRight size={12} className="inline ml-1 -mt-0.5" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;