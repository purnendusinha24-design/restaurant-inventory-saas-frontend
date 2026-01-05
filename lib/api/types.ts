export type AuthUser = {
  id: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  organizationId: string;
};
