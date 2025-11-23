import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { approveTask, rejectTask } from '@/app/actions/tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ExternalLink, Clock, User, Trophy } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect('/dashboard');
    }

    // Fetch pending reviews with user and task details
    const { data: reviews, error } = await supabase
        .from('user_tasks')
        .select(`
      id,
      status,
      proof_url,
      submitted_at,
      user:profiles(id, full_name, username, avatar_url),
      task:tasks(id, title, xp_reward)
    `)
        .eq('status', 'review')
        .order('submitted_at', { ascending: true });

    if (error) {
        console.error('Error fetching reviews:', error);
        return <div>Error loading reviews.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Mission Control Reviews</h1>
                    <p className="text-zinc-400">Verify agent submissions and award XP.</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 px-4 py-1">
                    {reviews?.length || 0} Pending
                </Badge>
            </div>

            <div className="grid gap-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review: any) => (
                        <Card key={review.id} className="bg-zinc-900/50 border-zinc-800">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Task & User Info */}
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{review.task.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                                                    <Trophy className="w-4 h-4 text-lime-500" />
                                                    <span className="text-lime-500 font-medium">{review.task.xp_reward} XP</span>
                                                    <span>•</span>
                                                    <Clock className="w-4 h-4" />
                                                    <span>Submitted {new Date(review.submitted_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                                <User className="w-5 h-5 text-zinc-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    {review.user.full_name || review.user.username || 'Unknown Agent'}
                                                </p>
                                                <p className="text-xs text-zinc-500">Agent ID: {review.user.id.slice(0, 8)}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Proof of Work</p>
                                            <a
                                                href={review.proof_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm break-all bg-blue-500/5 p-3 rounded border border-blue-500/10"
                                            >
                                                <ExternalLink className="w-4 h-4 shrink-0" />
                                                {review.proof_url}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-start md:min-w-[140px]">
                                        <form action={async () => {
                                            'use server';
                                            await approveTask(review.id, review.task.xp_reward, review.user.id);
                                        }}>
                                            <Button
                                                type="submit"
                                                className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold"
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Approve
                                            </Button>
                                        </form>

                                        <form action={async () => {
                                            'use server';
                                            await rejectTask(review.id);
                                        }}>
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Reject
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                        <CheckCircle2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white">All Clear</h3>
                        <p className="text-zinc-500">No pending reviews at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
