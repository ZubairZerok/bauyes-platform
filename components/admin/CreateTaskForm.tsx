'use client';

import { useState, useEffect } from 'react';
import { createTask } from '@/app/actions/tasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Plus, Calendar } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function CreateTaskForm() {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>('');

    useEffect(() => {
        async function fetchEvents() {
            const supabase = createClient();
            const { data } = await supabase.from('events').select('id, title').order('created_at', { ascending: false });
            if (data) setEvents(data);
        }
        fetchEvents();
    }, []);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            if (selectedEventId) {
                formData.append('event_id', selectedEventId);
            }
            await createTask(formData);
            toast.success('Task created successfully');
            const form = document.getElementById('create-task-form') as HTMLFormElement;
            if (form) form.reset();
            setSelectedEventId('');
        } catch (error) {
            toast.error('Failed to create task');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-zinc-800 bg-black/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-lime-400" />
                    Create New Operation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form id="create-task-form" action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-zinc-400">Operation Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Deploy First Smart Contract"
                            required
                            className="bg-zinc-900/50 border-zinc-800 text-white focus:border-lime-500/50 focus:ring-lime-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-400">Briefing (Description)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe the mission objectives..."
                            required
                            className="min-h-[100px] bg-zinc-900/50 border-zinc-800 text-white focus:border-lime-500/50 focus:ring-lime-500/20"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="xp_reward" className="text-zinc-400">XP Reward</Label>
                            <Input
                                id="xp_reward"
                                name="xp_reward"
                                type="number"
                                min="0"
                                defaultValue="100"
                                required
                                className="bg-zinc-900/50 border-zinc-800 text-white focus:border-lime-500/50 focus:ring-lime-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event_select" className="text-zinc-400">Link to Event (Optional)</Label>
                            <select
                                id="event_select"
                                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500/50"
                                value={selectedEventId}
                                onChange={(e) => setSelectedEventId(e.target.value)}
                            >
                                <option value="">-- No Event (Global Task) --</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>{event.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-zinc-800">
                        <div className="space-y-0.5">
                            <Label htmlFor="is_global" className="text-white">Global Operation</Label>
                            <p className="text-xs text-zinc-500">Visible to all agents (unless event-specific)</p>
                        </div>
                        <Switch id="is_global" name="is_global" defaultChecked={!selectedEventId} disabled={!!selectedEventId} />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Initializing...
                            </>
                        ) : (
                            'Initialize Operation'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
