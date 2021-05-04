import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { startLoginUser } from '../../redux/user/actions';

class LoginComponent extends React.Component {
    emailInput = createRef(null);
    passwordInput = createRef(null);

    handleSubmitForm = event => {
        event.preventDefault();
        const email = this.emailInput.current.value;
        const password = this.passwordInput.current.value;
        this.props.startLoginUser(email, password);
    }

    render() {
        return (
            <form id="login-form" name="login-form" onSubmit={this.handleSubmitForm}>
                <div>
                    <label htmlFor="email">Correo: </label>
                    <input type="email" name="email" id="email" ref={this.emailInput} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña: </label>
                    <input type="password" name="password" id="password" ref={this.passwordInput} />
                </div>
                <div>
                    <button type="submit" form="login-form">Iniciar Sesión</button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
     startLoginUser: (email, password) => dispatch(startLoginUser(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginComponent);