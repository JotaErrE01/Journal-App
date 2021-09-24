import React from 'react'
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
    return (
        <div>
            <h3 className='auth__title mb-5'>Register</h3>

            <form>
                <input  
                    type="text" 
                    placeholder="Name"
                    name="name" 
                    className='auth__input mb-5'
                    autoComplete="off"
                />

                <input  
                    type="text" 
                    placeholder="Email"
                    name="email" 
                    className='auth__input mb-5'
                    autoComplete="off"
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className='auth__input mb-5'
                    autoComplete="off"
                />

                <input 
                    type="password" 
                    placeholder="Conifrm Password"
                    name="password2"
                    className='auth__input mb-5'
                    autoComplete="off"
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