import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import authReducer from '../reducres/authReducer';
import thunk from 'redux-thunk';
import uiReducer from '../reducres/uiReducer';
import notesReducer from '../reducres/notesReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

// LEE LA DOCUMENTACION EL LITERAL 1.3 PARA DESCARGAR CON NPM
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  RETORNA UNA FUNCION AL IGAUL QUE COMPOSE las cuales se usan en el create store para poder aplicar middleware
// aqui se pregunta si existe devtools como extension regresa el primero, si no regresa compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);


export default store;