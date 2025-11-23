"use client";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Optional custom className to extend styling */
    className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    const baseClasses =
        "flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bauyesDark disabled:opacity-50 disabled:pointer-events-none bg-bauyesDark/20 border-bauyesDark text-white placeholder:text-gray-500 focus:border-bauyesGreen focus:ring-bauyesGreen resize-none";
    return <textarea ref={ref} className={cn(baseClasses, className)} {...props} />;
});

Textarea.displayName = "Textarea";

export { Textarea };
