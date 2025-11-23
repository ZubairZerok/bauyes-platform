'use client';

import { useState } from 'react';
import { submitTaskProof } from '@/app/actions/tasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';

interface TaskSubmissionDialogProps {
    taskId: string;
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export default function TaskSubmissionDialog({ taskId, trigger, onSuccess }: TaskSubmissionDialogProps) {
    const [loading, setLoading] = useState(false);
    const [proofUrl, setProofUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit() {
        if (!proofUrl) {
            toast.error('Please provide a proof URL');
            return;
        }

        setLoading(true);
        try {
            await submitTaskProof(taskId, proofUrl);
            toast.success('Proof submitted for review!');
            setIsOpen(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error('Failed to submit proof');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                        Submit Proof <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Mission Proof</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Proof URL (Github, Drive, etc.)</label>
                        <Input
                            placeholder="https://..."
                            value={proofUrl}
                            onChange={(e) => setProofUrl(e.target.value)}
                            className="bg-zinc-900 border-zinc-800 text-white focus:ring-lime-500/20 focus:border-lime-500/50"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-lime-500 hover:bg-lime-600 text-black font-bold w-full sm:w-auto"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit for Review'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
