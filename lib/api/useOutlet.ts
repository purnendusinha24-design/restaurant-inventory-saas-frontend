import { useState } from "react";

type UseOutletResult = {
  outletId: string;
};

export function useOutlet(): UseOutletResult {
  const [outletId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("activeOutletId") ?? "";
  });

  return { outletId };
}
