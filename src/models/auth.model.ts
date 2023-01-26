import storage from "redux-persist/lib/storage"

export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthData {
    user_id:    number | null;
    user_email: string | null;
    token:      string | null;
}
export interface LoginResponse  extends AuthData{
    message:    string;
}

export const persistAuthToken  = {
    key: 'user',
    storage
}