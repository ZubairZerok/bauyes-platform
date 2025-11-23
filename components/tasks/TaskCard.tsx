'use client';

import { useState } from 'react';
import { Task, UserTask } from '@/types';
import { startTask } from '@/app/actions/tasks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TaskSubmissionDialog from './TaskSubmissionDialog';
import { toast } from 'sonner';
import { Loader2, Trophy, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    userTask?: UserTask;
}

export default function TaskCard({ task, userTask }: TaskCardProps) {
    const [loading, setLoading] = useState(false);

    const status = userTask?.status || 'available';

    async function handleStart() {
        setLoading(true);
        try {
            await startTask(task.id);
            toast.success('Mission started!');
        } catch (error) {
            toast.error('Failed to start mission');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const statusColors = {
        available: 'border-zinc-800 bg-zinc-900/20',
        pending: 'border-blue-500/30 bg-blue-500/5',
        review: 'border-yellow-500/30 bg-yellow-500/5',
        completed: 'border-lime-500/30 bg-lime-500/5',
    };

    const statusBadge = {
        available: null,
        pending: <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Active</Badge>,
        review: <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Under Review</Badge>,
        completed: <Badge variant="secondary" className="bg-lime-500/10 text-lime-400 border-lime-500/20">Completed</Badge>,
    };

    return (
        <Card className={cn("transition-all duration-300 hover:border-zinc-700", statusColors[status as keyof typeof statusColors])}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-bold text-white leading-tight">
                            {task.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(task.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <Badge variant="outline" className="bg-lime-500/10 text-lime-400 border-lime-500/20 shrink-0 flex gap-1 items-center">
                        <Trophy className="w-3 h-3" />
                        {task.xp_reward} XP
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pb-4">
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {task.description || "No briefing available for this operation."}
                </p>

                {status !== 'available' && (
                    <div className="mt-4 flex justify-between items-center">
                        {statusBadge[status as keyof typeof statusBadge]}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-0">
                {status === 'available' && (
                    <Button
                        onClick={handleStart}
                        disabled={loading}
                        className="w-full bg-zinc-100 hover:bg-white text-black font-semibold"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Mission'}
                    </Button>
                )}

                {status === 'pending' && (
                    <TaskSubmissionDialog
                        taskId={task.id}
                    />
                )}

                {status === 'review' && (
                    <Button variant="outline" disabled className="w-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
                        <Clock className="w-4 h-4 mr-2" /> Awaiting Verification
                    </Button>
                )}

                {status === 'completed' && (
                    <Button variant="outline" disabled className="w-full border-lime-500/20 text-lime-500 bg-lime-500/5">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Mission Accomplished
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
