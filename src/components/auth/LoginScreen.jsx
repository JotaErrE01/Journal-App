import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';


const LoginScreen = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.ui.msgError);
    const loading = useSelector(state => state.ui.loading);

    const [ { email, password }, handleInputChange ] = useForm({
        email: '',
        password:''
    });

    const handleLogin = e => {
        e.preventDefault();

        // validar si hay campos  vacios
        if(email.trim() === '' || password.trim() === '' ){
            dispatch( setError( 'Todos los campos son obligatorios' ) );
            return;
        }

        if(!validator.isEmail(email)){
            dispatch( setError( 'El email no es valido' ) );
            return;
        }

        dispatch( removeError() );
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( removeError() );
        dispatch( startGoogleLogin() );
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3 className='auth__title mb-5'>Login</h3>

            <form
                onSubmit={handleLogin}
            >

                {
                    error &&
                        <div className="auth__alert-error">
                            { error }
                        </div>
                }

                <input  
                    type="text" 
                    placeholder="Email"
                    name="email"
                    value={email}
                    className='auth__input mb-5'
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={password}
                    className='auth__input mb-5'
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className='btn btn-primary pointer btn-block'
                    disabled={ loading }
                >Login</button>

                <hr />

                <div className='auth__social-networks'>
                    <p>Login With Social Networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to='/auth/register' className="link" >Create New Account</Link>
            </form>
        </div>
    )
}

export default LoginScreen;