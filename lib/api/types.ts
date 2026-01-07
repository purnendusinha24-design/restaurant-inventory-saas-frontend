export type UserRole = "OWNER" | "MANAGER" | "STAFF";

export type AuthUser = {
  id: string;
  role: UserRole;
  organizationId: string;
};

export type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    organization: {
      id: string;
      name: string;
      currency: string;
    };
  };
};

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  status: "ACTIVE" | "INACTIVE" | "INVITED";
  createdAt: string;
};

export type CreatedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "MANAGER" | "STAFF";
  status: "INVITED" | "ACTIVE" | "INACTIVE";
  inviteToken: string;
  createdAt: string;
};
