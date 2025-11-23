'use client';

import { useState } from 'react';
import { updateEventScore } from '@/lib/actions/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

interface EventScorerProps {
    registrationId: string;
    currentScore: number;
    attendeeName: string;
}

export default function EventScorer({ registrationId, currentScore, attendeeName }: EventScorerProps) {
    const [score, setScore] = useState(currentScore || 0);
    const [awardGlobal, setAwardGlobal] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        setLoading(true);
        try {
            await updateEventScore(registrationId, score, awardGlobal);
            toast.success(`Score updated for ${attendeeName}`);
            if (awardGlobal) {
                toast.success(`Global XP awarded to ${attendeeName}`);
                setAwardGlobal(false); // Reset toggle
            }
        } catch (error) {
            toast.error('Failed to update score');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-4 p-2 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
            <div className="flex-1">
                <Label htmlFor={`score-${registrationId}`} className="sr-only">Score</Label>
                <Input
                    id={`score-${registrationId}`}
                    type="number"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                    className="w-24 bg-zinc-900 border-zinc-800 text-white h-8 text-right font-mono"
                />
            </div>

            <div className="flex items-center gap-2">
                <Switch
                    id={`global-${registrationId}`}
                    checked={awardGlobal}
                    onCheckedChange={setAwardGlobal}
                />
                <Label htmlFor={`global-${registrationId}`} className="text-xs text-zinc-500 whitespace-nowrap">
                    +XP
                </Label>
            </div>

            <Button
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="h-8 bg-zinc-800 hover:bg-zinc-700 text-white"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            </Button>
        </div>
    );
}
