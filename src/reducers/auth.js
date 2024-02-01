import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import auth from '../utils/auth.js';
import { getUser } from '../utils/network.js';

const initialState = {
    user: {
        name: '',
        email: ''
    },
    isSigned: auth.isSigned(),
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action) {
            auth.signout();
            state.user = { name: '', email: '' };
            state.isSigned = auth.isSigned();
            state.status = 'idle';
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        
        builder
            .addCase(signinUser.pending, (state, action) => {
                state.status = 'loading'
                console.log(initialState);
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.status = 'succeded'

                const { username } = action.payload;

                auth.signin({ username });

                state.user.name = username;
                state.isSigned = true;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isSigned = false;
                state.error = action.error.message;
            })
    },
})

export const selectAuthStatus = state => state.auth.status;
export const selectAuthError = state => state.auth.error;
export const selectIsSigned = state => state.auth.isSigned;

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (user) => {
        return await getUser(user)
    }
)

export const { logout } = authSlice.actions;

export default authSlice.reducer;

