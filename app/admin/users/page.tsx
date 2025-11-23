import { createClient } from "@/utils/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";

export default async function AdminUsersPage() {
    const supabase = await createClient();

    const { data: users } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    User Management
                </h1>
                <p className="text-zinc-400">View and manage registered operatives</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900">
                        <TableRow className="border-zinc-800 hover:bg-zinc-900">
                            <TableHead className="text-zinc-400">User</TableHead>
                            <TableHead className="text-zinc-400">Username</TableHead>
                            <TableHead className="text-zinc-400">Role</TableHead>
                            <TableHead className="text-zinc-400">Joined</TableHead>
                            <TableHead className="text-zinc-400 text-right">Total XP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((profile) => (
                            <TableRow key={profile.id} className="border-zinc-800 hover:bg-zinc-800/50">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 border border-zinc-700">
                                            <AvatarImage src={profile.avatar_url} />
                                            <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                                {profile.full_name?.[0] || profile.username?.[0] || "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-white">
                                            {profile.full_name || "Unknown"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-zinc-400">
                                    @{profile.username}
                                </TableCell>
                                <TableCell>
                                    {profile.role === 'admin' ? (
                                        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Admin
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-zinc-700">
                                            <User className="w-3 h-3 mr-1" />
                                            User
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-zinc-400">
                                    {new Date(profile.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-lime-400">
                                    {/* Placeholder for total XP if not in profile yet */}
                                    ---
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
