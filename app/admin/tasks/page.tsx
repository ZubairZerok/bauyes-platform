import { createClient } from "@/utils/supabase/server";
import CreateTaskForm from "@/components/admin/CreateTaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Calendar, Globe } from "lucide-react";

export default async function AdminTasksPage() {
    const supabase = await createClient();

    const { data: tasks } = await supabase
        .from("tasks")
        .select(`
            *,
            event:events(title)
        `)
        .order("created_at", { ascending: false });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    Mission Control
                </h1>
                <p className="text-zinc-400">Create and manage operations and tasks</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Task Form */}
                <div className="lg:col-span-1">
                    <Card className="bg-zinc-900/50 border-zinc-800 sticky top-8">
                        <CardHeader>
                            <CardTitle className="text-white">New Operation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CreateTaskForm />
                        </CardContent>
                    </Card>
                </div>

                {/* Task List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white">Active Operations</h2>

                    <div className="space-y-4">
                        {tasks?.map((task) => (
                            <div key={task.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-white">{task.title}</h3>
                                        {task.is_global ? (
                                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                                <Globe className="w-3 h-3 mr-1" />
                                                Global
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                Event
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-zinc-400 text-sm max-w-xl">{task.description}</p>

                                    {!task.is_global && task.event && (
                                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                                            Linked to: <span className="text-zinc-300">{task.event.title}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Reward</span>
                                        <span className="text-lg font-bold text-lime-400 flex items-center gap-1">
                                            <Trophy className="w-4 h-4" />
                                            {task.xp_reward} XP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!tasks || tasks.length === 0) && (
                            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                                <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-white">No Operations</h3>
                                <p className="text-zinc-500">Create a new mission to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
