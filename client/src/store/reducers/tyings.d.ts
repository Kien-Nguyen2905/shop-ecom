// Define the profile type
export type TProfile = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, unknown>; // Assuming address is an object, modify if necessary
  earn_point: number;
  total_paid: number;
};

// Define the state type
export type TAuthState = {
  profile: Profile | null; // Profile can be null initially
  listOrder: any; // Define the type of listOrder if needed
};
