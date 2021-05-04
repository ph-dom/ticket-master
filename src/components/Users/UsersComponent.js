import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';

const UserComponent = props => {
    const [ proyects, setProyects ] = useState([]);

    const nameRef = createRef(null);
    const emailRef = createRef(null);
    const phoneNumberRef = createRef(null);
    const passwordRef = createRef(null);
    const roleRef = createRef(null);
    
    const handleChangeProyectsCheckbox = event => {
        const value = event.target.value;
        if(proyects.indexOf(value) > -1) {
            setProyects(prycts => {
                return prycts.filter(x => x !== value);
            });
        } else {
            setProyects(prycts => {
                return [
                    ...prycts,
                    value
                ];
            });
        }
    }

    return (
        <div>
            <h1>UsersComponent</h1>
            <form id="user-form">
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
                                <input type="checkbox" id={opt.id} name="projects" value={opt.value.text} onChange={handleChangeProyectsCheckbox}/>
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
        </div>
    );
}

const mapStateToProps = (state) => ({
    customFields: state.board.customFields || []
});

export default connect(mapStateToProps)(UserComponent);