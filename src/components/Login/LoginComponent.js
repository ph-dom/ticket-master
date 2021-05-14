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
            <section className="container">
                <form className="row" id="login-form" onSubmit={this.handleSubmitForm}>
                    <div className="col s12 m10 l8 xl6">
                        <h4>Iniciar Sesión</h4>
                        <div className="input-field">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={this.emailInput}
                                autoComplete="off"
                                required={true}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                ref={this.passwordInput}
                                autoComplete="off"
                                required={true}
                            />
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" form="login-form">Iniciar Sesión</button>
                    </div>
                </form>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
     startLoginUser: (email, password) => dispatch(startLoginUser(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginComponent);