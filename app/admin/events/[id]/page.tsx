import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Trophy, Users, Target } from "lucide-react";
import Link from "next/link";
import EventScorer from "@/components/admin/EventScorer";

export default async function AdminEventDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    const { data: event } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

    if (!event) notFound();

    // Fetch registrations
    const { data: registrations } = await supabase
        .from("registrations")
        .select(`
            *,
            user:profiles(*)
        `)
        .eq("event_id", id)
        .order("created_at", { ascending: false });

    // Fetch event tasks
    const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("event_id", id)
        .order("created_at", { ascending: false });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/events">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">
                        {event.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{registrations?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total XP Pool</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-500">{event.xp_reward} XP</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Active Missions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-lime-500">{tasks?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="attendees" className="w-full">
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="attendees">Attendees & Scoring</TabsTrigger>
                    <TabsTrigger value="tasks">Event Missions</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="attendees" className="mt-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                Manage Attendees
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {registrations?.map((reg) => (
                                    <div key={reg.id} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                                {reg.user.avatar_url ? (
                                                    <img src={reg.user.avatar_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-5 h-5 text-zinc-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{reg.user.full_name || reg.user.username}</p>
                                                <p className="text-xs text-zinc-500">{reg.team_name || "No Team"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            {reg.submission_url && (
                                                <a href={reg.submission_url} target="_blank" className="text-xs text-blue-400 hover:underline">
                                                    View Project
                                                </a>
                                            )}
                                            <EventScorer
                                                registrationId={reg.id}
                                                currentScore={reg.event_score}
                                                attendeeName={reg.user.full_name || reg.user.username}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!registrations || registrations.length === 0) && (
                                    <p className="text-center text-zinc-500 py-8">No registrations yet.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tasks" className="mt-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                                <Target className="w-5 h-5 text-lime-400" />
                                Event Missions
                            </CardTitle>
                            <Link href="/admin/tasks">
                                <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300">
                                    Manage All Missions
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tasks?.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-lg">
                                        <div>
                                            <p className="font-bold text-white">{task.title}</p>
                                            <p className="text-xs text-zinc-500">{task.xp_reward} XP Reward</p>
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {(!tasks || tasks.length === 0) && (
                                    <p className="text-center text-zinc-500 py-8">No missions linked to this event.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
