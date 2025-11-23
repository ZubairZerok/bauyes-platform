import { GridBackground } from "@/components/ui/GridBackground";
import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            <div className="opacity-50">
                <GridBackground />
            </div>

            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 w-full flex justify-center">
                <AuthForm />
            </div>
        </div>
    );
}
