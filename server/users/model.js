class User {
    email = null;
    phoneNumber = null;
    password = null;
    displayName = null;
    projects = null;
    role = null;

    constructor({ email, phoneNumber, password, displayName, projects, role }) {
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
        this.setPassword(password);
        this.setDisplayName(displayName);
        this.setProjects(projects);
        this.setRole(role);
    }

    setEmail(email) {
        if(typeof email === 'string' && email.trim().length > 0 && email.indexOf('@') > -1) {
            this.email = email;
        } else {
            throw new Error('Email inválido.');
        }
    }

    setPhoneNumber(phoneNumber) {
        if(typeof phoneNumber === 'string' && phoneNumber.trim().length > 0) {
            this.phoneNumber = phoneNumber;
        } else {
            throw new Error('Número de telefono inválido.');
        }
    }

    setPassword(password) {
        if(typeof password === 'string' && password.trim().length >= 8) {
            this.password = password;
        } else {
            throw new Error('Contraseña inválida.');
        }
    }

    setDisplayName(displayName) {
        if(typeof displayName === 'string' && displayName.trim().length >= 5) {
            this.displayName = displayName;
        } else {
            throw new Error('Nombre de usuario inválido.');
        }
    }

    setRole(role) {
        if(typeof role === 'string' && (role === 'admin' || role === 'client')) {
            this.role = role;
        } else {
            throw new Error('Rol de usuario inválido.');
        }
    }

    setProjects(projects) {
        if(typeof projects === 'object' && projects.length >= 1 && projects.filter(x => typeof x === 'string').length >= 1) {
            this.projects = projects;
        } else {
            throw new Error('Projectos de usuario inválidos.');
        }
    }

    toObject() {
        return {
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            displayName: this.displayName,
            projects: this.projects,
            role: this.role
        };
    }
}

module.exports = User;