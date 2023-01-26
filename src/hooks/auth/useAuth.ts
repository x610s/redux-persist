import React from 'react'
import { useAppSelector } from '../../app/hooks';

export const useAuth = (): string | null => {
    return useAppSelector((state) => state).auth.token ?? null;
}
