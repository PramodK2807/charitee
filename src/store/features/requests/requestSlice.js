import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requests : []
}

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        submitRequest: (state, action) => {
            console.log(action.payload);
            console.log(action.payload);
            const requestData = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                message:action.payload.message,
                createdAt: action.payload.createdAt
            }
            state.requests.push(requestData);
        }
    }
})


export const {submitRequest} = requestSlice.actions
export default requestSlice.reducer