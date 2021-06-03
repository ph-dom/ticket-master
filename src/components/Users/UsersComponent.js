import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const createNewUser = (idToken, newUser) => {
    return axios.request({
        url: '/api/users',
        method: 'post',
        data: newUser,
        headers: {
            'Authorization': idToken
        }
    }).then(response => {
        return response.data;
    });
};

const UserComponent = props => {
    const [ projects, setProjects ] = useState([]);

    const nameRef = createRef(null);
    const emailRef = createRef(null);
    const phoneNumberRef = createRef(null);
    const passwordRef = createRef(null);
    const roleRef = createRef(null);
    
    const handleChangeProjectsCheckbox = event => {
        const value = event.target.value;
        if(projects.indexOf(value) > -1) {
            setProjects(prycts => {
                return prycts.filter(x => x !== value);
            });
        } else {
            setProjects(prycts => {
                return [
                    ...prycts,
                    value
                ];
            });
        }
    }

    const handleSubmitForm = event => {
        event.preventDefault();
        let newUser = {
            email: emailRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            password: passwordRef.current.value,
            displayName: nameRef.current.value,
            projects,
            role: roleRef.current.value
        };
        createNewUser(props.idToken, newUser).then(data => {
            document.querySelector('#user-form').reset();
            window.M.toast({ html: 'Usuario creado exitosamente.' });
        }).catch(error => {
            window.M.toast({ html: 'Error al crear un nuevo usuario.' });
        })
    }

    return (
        <section className="container">
            <form className="row" id="user-form" onSubmit={handleSubmitForm}>
                <div className="col s12 m10 l8 xl6">
                    <h4 className="text-center">Crear Usuario</h4>
                    <div className="input-field">
                        <label htmlFor="displayName">Nombre</label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            ref={nameRef}
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="phoneNumber">Número de celular</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            ref={phoneNumberRef}
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="checkbox-group">
                        <label>Proyectos</label>
                        {(props.customFields.length > 0) && props.customFields.find(cf => cf.name === 'proyecto').options.map(opt => {
                            return (
                                <p key={opt.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            id={opt.id}
                                            name="projects"
                                            value={opt.value.text}
                                            onChange={handleChangeProjectsCheckbox}
                                        />
                                        <span>{opt.value.text}</span>
                                    </label>
                                </p>
                            );
                        })}
                    </div>
                    <div className="default-select">
                        <label>Rol</label>
                        <select
                            className="browser-default"
                            id="role"
                            name="role"
                            ref={roleRef}
                            defaultValue=""
                            required={true}
                        >
                            <option value="">Seleccione</option>
                            <option value="admin">Administrador</option>
                            <option value="client">Cliente</option>
                        </select>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" form="user-form">Crear Usuario</button>
                </div>
            </form>
        </section>
    );
}

const mapStateToProps = (state) => ({
    customFields: state.board.customFields || [],
    idToken: state.user.idToken
});

export default connect(mapStateToProps)(UserComponent);