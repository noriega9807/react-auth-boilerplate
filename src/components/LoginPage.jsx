import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startRegister } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';

export class LoginPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };

    submitRegister = () => {
        if(!this.state.email || !this.state.password || !isEmail(this.state.email)){
 
            this.setState(() => ({ error: 'Por favor ingresa tus credenciales' }));
        }else{
            // clear error
            this.setState(() => ({ error: '' }));
            this.props.startRegister({
                email: this.state.email,
                password: this.state.password
            });
        }
    };

    submitLogin = () => {
        if(!this.state.email || !this.state.password || !isEmail(this.state.email)){
            //set error
            this.setState(() => ({ error: 'Por favor ingresa tus credenciales' }));
        }else{
            // clear error
            this.setState(() => ({ error: '' }));
            this.props.startLogin({
                email: this.state.email,
                password: this.state.password
            });
        }
    };

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Login</h1>
                    <p>Ingresa tus credenciales.</p>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    {this.props.error && <p className="form__error">{this.props.error}</p>}
                    <input 
                        className="text-input text-input-login"
                        type="text"
                        placeholder="Correo"
                        autoFocus
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                    <input 
                        className="text-input text-input-login"
                        type="password"
                        placeholder="Contraseña"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                    <button className="button button--link button--link__login" onClick={this.submitRegister}>Registrate</button>
                    <button className="button" onClick={this.submitLogin}>Iniciar sesión</button>
                </div>
            </div>
        );
    }
    
};

const mapStateToProps = (state, props) => {
    return {
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (user) => dispatch(startLogin(user)),
    startRegister: (user) => dispatch(startRegister(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);