"use client";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional custom className to extend styling */
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    const baseClasses =
        "inline-flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bauyesDark disabled:opacity-50 disabled:pointer-events-none bg-bauyesDark/20 border-bauyesDark text-white placeholder:text-gray-500 focus:border-bauyesGreen focus:ring-bauyesGreen";
    return <input ref={ref} className={cn(baseClasses, className)} {...props} />;
});

Input.displayName = "Input";

export { Input };
