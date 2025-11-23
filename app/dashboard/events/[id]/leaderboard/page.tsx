import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function EventLeaderboardPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: event, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (eventError || !event) {
        return <div>Event not found</div>;
    }

    // Fetch registrations sorted by event_score
    const { data: registrations, error: regError } = await supabase
        .from('registrations')
        .select(`
      id,
      event_score,
      team_name,
      user:profiles(id, full_name, username, avatar_url)
    `)
        .eq('event_id', id)
        .order('event_score', { ascending: false })
        .limit(50);

    if (regError) {
        console.error('Error fetching leaderboard:', regError);
        return <div>Error loading leaderboard</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href={`/dashboard/events/${id}`} className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Event
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Leaderboard</h1>
                    <p className="text-zinc-400">Top performers for <span className="text-white font-medium">{event.title}</span></p>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 px-4 py-2 text-sm">
                    <Trophy className="w-4 h-4 mr-2" />
                    Top 50
                </Badge>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium w-20">Rank</th>
                                    <th className="px-6 py-4 font-medium">Participant / Team</th>
                                    <th className="px-6 py-4 font-medium text-right">Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {registrations && registrations.length > 0 ? (
                                    registrations.map((reg: any, index: number) => (
                                        <tr key={reg.id} className="hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                                    index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                                                        index === 1 ? "bg-zinc-400/20 text-zinc-300" :
                                                            index === 2 ? "bg-orange-700/20 text-orange-600" :
                                                                "text-zinc-500"
                                                )}>
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                                        {reg.user.avatar_url ? (
                                                            <img src={reg.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <User className="w-5 h-5 text-zinc-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">
                                                            {reg.team_name || reg.user.full_name || reg.user.username || 'Unknown'}
                                                        </p>
                                                        {reg.team_name && (
                                                            <p className="text-xs text-zinc-500">
                                                                {reg.user.full_name || reg.user.username}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-mono font-bold text-lime-400 text-lg">
                                                    {reg.event_score || 0}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                                            No scores recorded yet. Be the first to climb the ranks!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
