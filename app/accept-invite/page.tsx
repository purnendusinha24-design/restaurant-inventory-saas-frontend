import { Suspense } from "react";
import AcceptInviteClient from "./AcceptInviteClient";

/**
 * Invite links should never be cached.
 * This ensures the page is always treated as fresh.
 */
export const revalidate = 0;

/* ----------------------------------------
   Skeleton shown while search params load
----------------------------------------- */
function InviteSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-4 animate-pulse">
        <div className="h-6 w-2/3 rounded bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-10 w-full rounded bg-slate-800" />
        <div className="h-10 w-full rounded bg-slate-800" />
        <div className="h-10 w-full rounded bg-slate-800" />
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<InviteSkeleton />}>
      <AcceptInviteClient />
    </Suspense>
  );
}
