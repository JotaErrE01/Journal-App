import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { 
    BrowserRouter as Router,   
    Switch,
    Redirect
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { onAuthStateChanged } from '@firebase/auth';
import LoadingScreen from '../components/LoadingScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startLoadinNotes } from '../actions/notes';

const AppRouter = () => {

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged( auth, async user => { // se ejecuta una unica vez y es un obserbable que estara al pendiente si la autenticacion cambia, leer documentacion para mas info
            if(user){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadinNotes() );
            }else{
                setIsLoggedIn( false );
            }

            setChecking( false );// ya sea que firebase retorne null o un usuario autenticado, dejara de cargar la autenticacion de firebase, ya que ningun componente debe mostrarse mientras firebase haga la autenticacion no importa si retorna null o un usuario.

        } );

    }, [ dispatch, setChecking, setIsLoggedIn ]) // dispatch y isAuthenticated son contantes y no van a cambiar a cambiar por ende no entra al ciclo infinito

    if( checking ){
        return <LoadingScreen />
    }

    return (
        <Router>
            <Switch>
                <PublicRoute path='/auth' component={AuthRouter} isLoggedIn={isLoggedIn} />
                <PrivateRoute exact path='/' component={JournalScreen} isLoggedIn={isLoggedIn} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default AppRouter;