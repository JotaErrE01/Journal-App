import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { 
    BrowserRouter as Router, 
    Route,  
    Switch,
    Redirect
} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path='/auth' component={AuthRouter} />
                <Route exact path='/' component={JournalScreen} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default AppRouter;