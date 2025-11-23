import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AdminEventsPage() {
    const supabase = await createClient();

    const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Events Management
                    </h1>
                    <p className="text-zinc-400">Create and manage events, track registrations</p>
                </div>
                <Link href="/admin/events/new">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                    </Button>
                </Link>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900">
                        <TableRow className="border-zinc-800 hover:bg-zinc-900">
                            <TableHead className="text-zinc-400">Event Name</TableHead>
                            <TableHead className="text-zinc-400">Date & Time</TableHead>
                            <TableHead className="text-zinc-400">Location</TableHead>
                            <TableHead className="text-zinc-400">Category</TableHead>
                            <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events?.map((event) => (
                            <TableRow key={event.id} className="border-zinc-800 hover:bg-zinc-800/50">
                                <TableCell className="font-medium text-white">
                                    {event.title}
                                </TableCell>
                                <TableCell className="text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {event.location}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                        {event.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <Link href={`/admin/events/${event.id}`}>
                                                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                                                    Manage Event
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={`/dashboard/events/${event.id}`} target="_blank">
                                                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                                                    View Public Page
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                            <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer">
                                                Delete Event
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
