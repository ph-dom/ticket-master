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
    const [ message, setMessage ] = useState('');

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
            setMessage('Usuario creado con éxito. uid: ' + data.uid);
            document.querySelector('#user-form').reset();
        }).catch(error => {
            setMessage('Error al registrar usuario.');
        })
    }

    return (
        <div>
            <h1>UsersComponent</h1>
            <form id="user-form" onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="displayName">Nombre</label>
                    <input type="text" id="displayName" name="displayName" ref={nameRef} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" ref={emailRef} />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Número de celular</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" ref={phoneNumberRef} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" ref={passwordRef} />
                </div>
                <div>
                    <label>Proyectos</label>
                    {(props.customFields.length > 0) && props.customFields.find(cf => cf.name === 'proyecto').options.map(opt => {
                        return (
                            <div key={opt.id}>
                                <input type="checkbox" id={opt.id} name="projects" value={opt.value.text} onChange={handleChangeProjectsCheckbox}/>
                                <label htmlFor={opt.id}>{opt.value.text}</label>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <label htmlFor="role">Rol</label>
                    <select id="role" name="role" ref={roleRef}>
                        <option>Seleccione</option>
                        <option value="admin">Administrador</option>
                        <option value="client">Cliente</option>
                    </select>
                </div>
                <button type="submit" form="user-form">Crear Usuario</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    customFields: state.board.customFields || [],
    idToken: state.user.idToken
});

export default connect(mapStateToProps)(UserComponent);