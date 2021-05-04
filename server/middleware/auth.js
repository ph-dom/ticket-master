const { auth, db } = require('../config/firebase-admin');

const authmid = async (request, response, next) => {
    try {
        const idToken = request.header('Authorization').replace('Bearer ', '');
        const decodedIdToken = await auth.verifyIdToken(idToken);
        const user = await auth.getUser(decodedIdToken.uid);
        const documentSnapshot = await db.collection('users').doc(decodedIdToken.uid).get();
        const userData = documentSnapshot.data();
        request.user = {
            uid: decodedIdToken.uid,
            role: userData.role,
            projects: userData.projects,
            tickets: userData.tickets ? userData.tickets : [],
            name: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
        next();
    } catch (error) {
        response.status(401).send({
            message: 'No autorizado',
            error
        });
    }
}

module.exports = authmid;