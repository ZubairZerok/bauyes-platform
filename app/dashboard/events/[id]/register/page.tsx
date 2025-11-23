import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { registerForEvent } from '@/lib/actions/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default async function EventRegistrationPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !event) {
        return <div>Event not found</div>;
    }

    // Check if already registered
    const { data: existingRegistration } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', params.id)
        .eq('user_id', user.id)
        .single();

    if (existingRegistration) {
        redirect(`/dashboard/events/${params.id}`);
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link href={`/dashboard/events/${params.id}`} className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Event
            </Link>

            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold text-white mb-2">{event.title}</CardTitle>
                            <CardDescription className="text-zinc-400">Complete your registration to join this event.</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-lime-500/10 text-lime-400 border-lime-500/20">
                            <Trophy className="w-3 h-3 mr-1" />
                            {event.xp_reward} XP
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-zinc-400 p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
                            {event.location}
                        </div>
                    </div>

                    <form action={async (formData) => {
                        'use server';
                        const teamName = formData.get('teamName') as string;
                        const projectLink = formData.get('projectLink') as string;

                        const result = await registerForEvent(event.id, user.id, teamName, projectLink);

                        if (result.success) {
                            redirect(`/dashboard/events/${event.id}`);
                        }
                    }} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={profile?.full_name || ''} disabled className="bg-zinc-950 border-zinc-800 text-zinc-500" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user.email || ''} disabled className="bg-zinc-950 border-zinc-800 text-zinc-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teamName">Team Name (Optional)</Label>
                            <Input
                                id="teamName"
                                name="teamName"
                                placeholder="e.g. The Innovators"
                                className="bg-zinc-900 border-zinc-800 text-white focus:ring-lime-500/20 focus:border-lime-500/50"
                            />
                            <p className="text-xs text-zinc-500">If you're participating as a team, enter your team name here.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="projectLink">Project/Portfolio Link (Optional)</Label>
                            <Input
                                id="projectLink"
                                name="projectLink"
                                placeholder="https://github.com/..."
                                className="bg-zinc-900 border-zinc-800 text-white focus:ring-lime-500/20 focus:border-lime-500/50"
                            />
                            <p className="text-xs text-zinc-500">You can add this later if you don't have it yet.</p>
                        </div>

                        <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold mt-6">
                            Confirm Registration
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
