export type AuthUser = {
  id: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  organizationId: string;
};

export type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "OWNER" | "MANAGER" | "STAFF";
    organization: {
      id: string;
      name: string;
      currency: string;
    };
  };
};
