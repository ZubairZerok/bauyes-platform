import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import TaskCard from '@/components/tasks/TaskCard';
import { Task, UserTask } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MissionsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch all global tasks
    const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_global', true)
        .order('created_at', { ascending: false });

    // Fetch user's task status
    const { data: userTasksData, error: userTasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id);

    if (tasksError || userTasksError) {
        console.error('Error fetching tasks:', tasksError || userTasksError);
        return <div>Error loading missions.</div>;
    }

    const tasks = (tasksData || []) as Task[];
    const userTasks = (userTasksData || []) as UserTask[];

    // Map user tasks for easy lookup
    const userTaskMap = new Map(userTasks.map(ut => [ut.task_id, ut]));

    // Categorize tasks
    const activeTasks = tasks.filter(task => {
        const ut = userTaskMap.get(task.id);
        return !ut || ut.status === 'pending';
    });

    const reviewTasks = tasks.filter(task => {
        const ut = userTaskMap.get(task.id);
        return ut?.status === 'review';
    });

    const completedTasks = tasks.filter(task => {
        const ut = userTaskMap.get(task.id);
        return ut?.status === 'completed';
    });

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Target className="w-8 h-8 text-lime-500" />
                    Mission Control
                </h1>
                <p className="text-zinc-400 max-w-2xl">
                    Select and execute operations to earn XP and climb the ranks.
                    Submit proof of completion for verification by command.
                </p>
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1">
                    <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        Active Operations ({activeTasks.length})
                    </TabsTrigger>
                    <TabsTrigger value="review" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        Under Review ({reviewTasks.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        Completed ({completedTasks.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-6">
                    {activeTasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    userTask={userTaskMap.get(task.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                            <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white">No Active Operations</h3>
                            <p className="text-zinc-500">All available missions have been completed or are under review.</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="review" className="mt-6">
                    {reviewTasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviewTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    userTask={userTaskMap.get(task.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                            <Clock className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white">No Pending Reviews</h3>
                            <p className="text-zinc-500">You don't have any missions currently awaiting verification.</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                    {completedTasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    userTask={userTaskMap.get(task.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                            <CheckCircle2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white">No Completed Missions</h3>
                            <p className="text-zinc-500">Complete missions to see them listed here.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
