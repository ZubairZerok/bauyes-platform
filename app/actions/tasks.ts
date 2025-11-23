'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTask(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const xp_reward = parseInt(formData.get('xp_reward') as string);
    const event_id = formData.get('event_id') as string || null;

    // If event_id exists, it's event-specific, otherwise it's global
    const is_global = event_id ? false : true;

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userData.user.id)
        .single();

    if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }

    const { error } = await supabase.from('tasks').insert({
        title,
        description,
        xp_reward,
        is_global,
        created_by: userData.user.id,
        event_id: event_id,
    });

    if (error) {
        console.error('Error creating task:', error);
        throw new Error('Failed to create task');
    }

    revalidatePath('/dashboard/tasks');
    revalidatePath('/admin/tasks');
    if (event_id) {
        revalidatePath(`/dashboard/events/${event_id}`);
    }
    return { success: true };
}

export async function startTask(taskId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase.from('user_tasks').insert({
        user_id: user.id,
        task_id: taskId,
        status: 'pending',
    });

    if (error) {
        console.error('Error starting task:', error);
        throw new Error('Failed to start task');
    }

    revalidatePath('/dashboard/tasks');
    return { success: true };
}

export async function submitTaskProof(taskId: string, proofUrl: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('user_tasks')
        .update({
            status: 'review',
            proof_url: proofUrl,
            submitted_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('task_id', taskId);

    if (error) {
        console.error('Error submitting proof:', error);
        throw new Error('Failed to submit proof');
    }

    revalidatePath('/dashboard/tasks');
    return { success: true };
}

export async function approveTask(userTaskId: string, xpReward: number, userId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }

    // 1. Update task status
    const { error: taskError } = await supabase
        .from('user_tasks')
        .update({ status: 'completed' })
        .eq('id', userTaskId);

    if (taskError) {
        console.error('Error approving task:', taskError);
        throw new Error('Failed to approve task');
    }

    // 2. Award XP
    const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', userId)
        .single();

    if (profileError) {
        console.error('Error fetching user profile:', profileError);
    } else {
        const newXp = (userProfile?.total_xp || 0) + xpReward;
        const { error: xpError } = await supabase
            .from('profiles')
            .update({ total_xp: newXp })
            .eq('id', userId);

        if (xpError) {
            console.error('Error updating XP:', xpError);
        }
    }

    revalidatePath('/admin/tasks/reviews');
    revalidatePath('/dashboard/tasks');
    return { success: true };
}

export async function rejectTask(userTaskId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }

    // Update task status back to pending so user can resubmit
    const { error } = await supabase
        .from('user_tasks')
        .update({ status: 'pending' })
        .eq('id', userTaskId);

    if (error) {
        console.error('Error rejecting task:', error);
        throw new Error('Failed to reject task');
    }

    revalidatePath('/admin/tasks/reviews');
    revalidatePath('/dashboard/tasks');
    return { success: true };
}
