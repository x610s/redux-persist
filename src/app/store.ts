import  transferenciaSlice  from './../features/transferencia/transferenciaSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistAuthToken } from '../models/auth.model';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    transferencias: transferenciaSlice,
    auth: persistReducer<ReturnType<typeof authReducer>>(persistAuthToken,authReducer)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
