import { DashboardShell } from "@/components/layout/DashboardShell";
import { RegisterButton } from "@/components/events/RegisterButton";
import { SubmissionDialogWrapper } from "@/components/events/SubmissionDialogWrapper";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Task, UserTask } from "@/types";
import TaskCard from "@/components/tasks/TaskCard";
import { Calendar, MapPin, Trophy, Upload, ExternalLink, CheckCircle, Clock, Target } from "lucide-react";
import Link from "next/link";

interface EventDetailsProps {
    params: {
        id: string;
    };
}

export default async function EventDetailsPage({ params }: EventDetailsProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { id } = await params;

    // Fetch event details
    const { data: event, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

    if (eventError || !event) {
        notFound();
    }

    // Check registration status
    const { data: registration } = await supabase
        .from("registrations")
        .select("*")
        .eq("event_id", id)
        .eq("user_id", user.id)
        .single();

    const isRegistered = !!registration;
    const submissionUrl = registration?.submission_url || null;
    const attendanceStatus = registration?.status || "registered";

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    // Fetch event tasks
    const { data: eventTasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: false });

    const eventTasks = (eventTasksData || []) as Task[];

    // Fetch user task status for event tasks
    let userEventTaskMap = new Map<string, UserTask>();

    if (eventTasks.length > 0) {
        const { data: userEventTasksData } = await supabase
            .from('user_tasks')
            .select('*')
            .eq('user_id', user.id)
            .in('task_id', eventTasks.map(t => t.id));

        const userEventTasks = (userEventTasksData || []) as UserTask[];
        userEventTaskMap = new Map(userEventTasks.map(ut => [ut.task_id, ut]));
    }

    return (
        <DashboardShell>
            <div className="bg-zinc-950 min-h-screen p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Back Link */}
                    <Link
                        href="/dashboard/events"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                        ← Back to Missions
                    </Link>

                    {/* Hero Section */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Trophy size={200} className="text-bauyesLime" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                {/* Category Badge */}
                                <div className="inline-block px-4 py-1.5 bg-bauyesLime/10 border border-bauyesLime/30 text-bauyesLime rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                                    {event.category}
                                </div>

                                {/* Leaderboard Link */}
                                <Link
                                    href={`/dashboard/events/${event.id}/leaderboard`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors border border-zinc-700"
                                >
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    View Leaderboard
                                </Link>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                {event.title}
                            </h1>

                            {/* Event Meta */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Calendar size={20} className="text-bauyesLime flex-shrink-0" />
                                    <div className="text-sm">
                                        <div className="font-medium text-white">{formattedDate}</div>
                                        <div className="text-zinc-500">{formattedTime}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <MapPin size={20} className="text-bauyesLime flex-shrink-0" />
                                    <div className="text-sm">
                                        <div className="font-medium text-white">{event.location}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-yellow-400">
                                    <Trophy size={20} className="flex-shrink-0" />
                                    <div className="text-sm">
                                        <div className="font-bold text-lg">+{event.xp_reward} XP</div>
                                        <div className="text-xs text-zinc-500">Bounty Reward</div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    {/* Status Board / Mission Control */}
                    {!isRegistered ? (
                        /* Not Registered - Show Registration CTA */
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
                            <div className="max-w-md mx-auto">
                                <Clock size={48} className="mx-auto text-zinc-600 mb-4" />
                                <h2 className="text-2xl font-display font-bold text-white mb-3">
                                    Ready to Join?
                                </h2>
                                <p className="text-zinc-400 mb-6">
                                    Register for this event to unlock mission control and submit your project.
                                </p>
                                <RegisterButton
                                    eventId={event.id}
                                    userId={user.id}
                                    isRegistered={false}
                                />
                            </div>
                        </div>
                    ) : (
                        /* Registered - Show Mission Control */
                        <div className="space-y-8">
                            <div className="space-y-6">
                                {/* Status Card */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-display font-bold text-white">
                                            Mission Control
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            {attendanceStatus === "attended" ? (
                                                <span className="px-3 py-1.5 bg-bauyesLime/10 border border-bauyesLime/30 text-bauyesLime rounded-full text-sm font-medium flex items-center gap-2">
                                                    <CheckCircle size={16} />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium">
                                                    Status: Active
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Registration Info */}
                                        <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                                                Registration
                                            </p>
                                            <p className="text-sm font-medium text-white">
                                                {registration.created_at
                                                    ? new Date(registration.created_at).toLocaleDateString()
                                                    : "Confirmed"}
                                            </p>
                                        </div>

                                        {/* Attendance Status */}
                                        <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                                                Attendance
                                            </p>
                                            <p className="text-sm font-medium text-white">
                                                {attendanceStatus === "attended"
                                                    ? "✅ Verified by admin"
                                                    : "⏳ Pending verification"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submission Area */}
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                    <h3 className="text-lg font-display font-bold text-white mb-4">
                                        Project Submission
                                    </h3>

                                    {submissionUrl ? (
                                        <div className="space-y-4">
                                            <div className="bg-zinc-950/50 rounded-lg p-4 border border-zinc-800">
                                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                                                    Submitted Project
                                                </p>
                                                <a
                                                    href={submissionUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-bauyesLime hover:underline flex items-center gap-2 break-all"
                                                >
                                                    <ExternalLink size={16} />
                                                    {submissionUrl}
                                                </a>
                                                {registration.submitted_at && (
                                                    <p className="text-xs text-zinc-500 mt-2">
                                                        Submitted on{" "}
                                                        {new Date(registration.submitted_at).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <SubmissionDialogWrapper
                                                eventId={event.id}
                                                userId={user.id}
                                                currentSubmission={submissionUrl}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Upload size={48} className="mx-auto text-zinc-600 mb-4" />
                                            <p className="text-zinc-400 mb-4">
                                                No project submitted yet. Share your work to complete the mission!
                                            </p>
                                            <SubmissionDialogWrapper
                                                eventId={event.id}
                                                userId={user.id}
                                                currentSubmission={null}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Event Missions */}
                            {eventTasks.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Target className="w-8 h-8 text-lime-500" />
                                        <h2 className="text-2xl font-display font-bold text-white">
                                            Event Missions
                                        </h2>
                                    </div>
                                    <p className="text-zinc-400">
                                        Complete these special operations to earn extra XP and boost your event score.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {eventTasks.map(task => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                userTask={userEventTaskMap.get(task.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardShell>
    );
}

// Client wrapper for submission dialog
// Moved to @/components/events/SubmissionDialogWrapper



