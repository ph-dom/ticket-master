import firestore, { auth } from '../../config/firebase';

export const loginUser = ({ uid, email, phoneNumber, password, displayName, projects, idToken, role }) => ({
    type: 'LOGIN_USER',
    data: {
        uid,
        email,
        phoneNumber,
        password,
        displayName,
        projects,
        idToken,
        role
    }
});

export const startLoginUser = (email, password) => {
    return () => {
        return auth.signInWithEmailAndPassword(email, password).catch(() => {
            window.M.toast({ html: 'Correo o contraseña mal ingresada.' });
        });
    };
};

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const startLogoutUser = () => {
    return () => {
        return auth.signOut();
    };
};

export const getUserData = uid => {
    return firestore.collection('users').doc(uid).get().then(documentSnapshot => {
        const data = documentSnapshot.data();
        return data;
    });
};