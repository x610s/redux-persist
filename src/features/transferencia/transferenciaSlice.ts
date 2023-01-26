import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  TransferenciaResponse } from "../../models/transferencia.model";
import { RootState } from "../../app/store";


export interface TransferenciaState{
    transferencias: TransferenciaResponse[]
}

const initialState: TransferenciaState[] = [];

export const transferenciaSlice = createSlice({
    name:'transfer',
    initialState,
    reducers:{
    }
});

export default transferenciaSlice.reducer;