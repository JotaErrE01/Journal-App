import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from '../firebase/config';
import types from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui";
import Swal from 'sweetalert2';
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return async dispatch => {
        dispatch( uiStartLoading() );
        try {
            const { user } = await signInWithEmailAndPassword( auth, email, password );
            dispatch( login( user.uid,  user.displayName ) );
            dispatch( uiFinishLoading() );
        } catch (error) {
            dispatch( uiFinishLoading() );
            Swal.fire('Error', error.message, 'error')
        }
    }
}

export const starRegisterWithEmailPassworName = ( email, password, name ) => {
    return async dispatch => {
        try {
            
            const userCredentials = await createUserWithEmailAndPassword( auth, email, password ); // esta funcin aparte de crear tambien logea al usuario en firebase

            const user =  userCredentials.user;

            await updateProfile( user, {
                displayName: name
            } );

            dispatch( login( user.uid, user.displayName ) );

        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }

    }
}

export const startGoogleLogin = () => {

    return dispatch => {
        signInWithPopup(auth, googleAuthProvider)
            .then( userCredential => {
                dispatch( login, userCredential.user.uid, userCredential.user.displayName );
            } )
            .catch( error => {
                console.log(error);
            } );
    }
}

export const login = ( uid, name ) => {
    return {
        type: types.login,
        payload: {
            uid,
            name
        }
    }
}

export const startLogout = () => {
    return async dispatch => {
        try {
            await signOut( auth );
            dispatch( logout() );
            dispatch( noteLogout() );
        } catch (error) {
            console.log(error);
        }
    }
}

export const logout = () => ({
    type: types.logout
})