const { db, auth } = require('../config/firebase-admin');

const createUser = async user => {
    const userRecord = await auth.createUser({
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        displayName: user.displayName,
        emailVerified: true,
        disabled: false
    });
    await db.collection('users').doc(userRecord.uid).set({
        projects: user.projects,
        role: user.role
    });
    return {
        uid: userRecord.uid
    };
}

module.exports = {
    createUser
};