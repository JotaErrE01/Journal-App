import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter = () => {
    return (
        <div className='auth'>
            <div className="auth__container mb-5">
                <Switch>
                    <Route exact path='/auth/login' component={LoginScreen}/>
                    <Route exact path='/auth/Register' component={RegisterScreen}/>
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </div>
    )
}

export default AuthRouter;