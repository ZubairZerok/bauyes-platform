"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthPickerProps {
    selectedMonth: Date;
    onMonthChange: (date: Date) => void;
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MonthPicker({ selectedMonth, onMonthChange }: MonthPickerProps) {
    const currentDate = new Date();
    const monthYear = `${MONTHS[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`;

    const goToPreviousMonth = () => {
        const newDate = new Date(selectedMonth);
        newDate.setMonth(newDate.getMonth() - 1);
        onMonthChange(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(selectedMonth);
        newDate.setMonth(newDate.getMonth() + 1);
        // Don't go beyond current month
        if (newDate <= currentDate) {
            onMonthChange(newDate);
        }
    };

    const isCurrentMonth = selectedMonth.getMonth() === currentDate.getMonth() &&
        selectedMonth.getFullYear() === currentDate.getFullYear();

    return (
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3">
            <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousMonth}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
                <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex-1 text-center">
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Leaderboard</p>
                <p className="text-lg font-bold text-white">{monthYear}</p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={goToNextMonth}
                disabled={isCurrentMonth}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
    );
}
