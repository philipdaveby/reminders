import { auth } from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const signOut = async () => {
    await auth.signOut();
  };

export const notify = (text: string) => toast(text);