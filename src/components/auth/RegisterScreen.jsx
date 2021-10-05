import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { useSelector } from 'react-redux';
import { starRegisterWithEmailPassworName } from '../../actions/auth';

const RegisterScreen = () => {

    const dispacth = useDispatch();
    const error = useSelector(state => state.ui.msgError);

    const [ usuario, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = usuario;

    const handleRegister = e => {
        e.preventDefault();

        if(isFormValid()){
            dispacth( removeError() );
            dispacth( starRegisterWithEmailPassworName( email, password, name ) );
        }
    }

    // validar si el formulario es valido
    const isFormValid = () => {

        if( name.trim() === '' ) {
            dispacth( setError( 'Name is required' ) );
            return false;
        }

        if( !validator.isEmail(email) ){
            dispacth( setError( 'Email is not valid' ) );
            return false;
        }

        if( password.length < 5 || password !== password2 ){
            dispacth( setError( 'Password should be at least 5 characters and match each others' ) );
            return false;
        }

        return true;
    }

    return (
        <div
            className="animate__animated animate__fadeIn animate__faster"
        >
            <h3 className='auth__title mb-5'>Register</h3>

            <form
                onSubmit={handleRegister}
            >

                {
                    error &&
                        <div className="auth__alert-error">
                            { error }
                        </div>
                }

                <input  
                    type="text" 
                    placeholder="Name"
                    name="name" 
                    className='auth__input mb-5'
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input  
                    type="text" 
                    placeholder="Email"
                    name="email" 
                    className='auth__input mb-5'
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className='auth__input mb-5'
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password" 
                    placeholder="Conifrm Password"
                    name="password2"
                    className='auth__input mb-5'
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className='btn btn-primary pointer btn-block mb-5'
                >Register</button>

                <Link to='/auth/login' className="link" >Already Register</Link>
            </form>
        </div>
    )
}

export default RegisterScreen;