"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface ResourceSearchProps {
    onSearch: (query: string) => void;
}

export function ResourceSearch({ onSearch }: ResourceSearchProps) {
    const handleSearch = useDebouncedCallback((value: string) => {
        onSearch(value);
    }, 300);

    return (
        <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
                type="text"
                placeholder="Search resources..."
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 sm:text-sm transition-colors"
            />
        </div>
    );
}
