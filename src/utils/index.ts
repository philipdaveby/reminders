import { auth } from "../firebase";

export const signOut = async () => {
    await auth.signOut();
  };