import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';


const register = createAsyncThunk(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        const { name, email, password } = credentials;

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            if (!response.user.displayName) {
                await updateProfile(auth.currentUser, { displayName: name });
            }

            const credentials = {
                user: {
                    name: response.user.displayName,
                    email: response.user.email,
                },
                uid: response.user.uid,
            };

            return credentials;
            
        } catch (error) {
            console.log('1: ', error.message);
            return rejectWithValue(error.message);
        }
    }
);

const logIn = createAsyncThunk(
    'auth/logInUser',
    async (credentials, { rejectWithValue }) => {
        const { email, password } = credentials;

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const credentials = {
                user: {
                    name: response.user.displayName,
                    email: response.user.email,
                },
                uid: response.user.uid,
            };
            return credentials;
        } catch (error) {
            console.log('2: ', error.message);
            return rejectWithValue(error.message);
        }
    }
);

const logOut = createAsyncThunk(
    'auth/logOutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log('3: ', error.message);
            return rejectWithValue(error.message);
        }
    }
);

const checkUser = () => async (dispatch, _) => {
    try {
        onAuthStateChanged(auth, (user) => {
            // console.log("user:", user)
            
            if (!user) return;

            const credentials = {
                user: { name: user.displayName, email: user.email },
                uid: user.uid,
            };

            dispatch(logIn(credentials));
        });
    } catch (error) {
        console.log('4: ', error.message);
        return rejectWithValue(error.message);
    }
};

export { register, logIn, logOut, checkUser };