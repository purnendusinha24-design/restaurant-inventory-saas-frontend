// frontend/components/OutletBootstrap.tsx
"use client";

import { useOutlet } from "@/lib/outlet-context";
import CreateOutletModal from "./CreateOutletModal";

export default function OutletBootstrap() {
  const { outlets, loading } = useOutlet();

  if (loading) return null;

  return <CreateOutletModal open={outlets.length === 0} force />;
}
