import React from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAuth();
    if(user == null){
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const ProtectedLogin = ({ children }: { children: JSX.Element }) => {
    const user = useAuth();
    if(user != null){
        return <Navigate to="/" replace />;
    }
    return children;
};

