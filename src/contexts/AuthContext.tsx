import React, { useContext } from "react";
import firebase from "firebase/app";

export const AuthContext = React.createContext<firebase.User | null>(null);

export const useAuth = (): any => {
    return useContext(AuthContext);
}