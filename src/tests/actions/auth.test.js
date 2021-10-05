import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom';
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import types from "../../types/types";


const mockStore = configureStore([ thunk ]);

const initState = { };

let store = mockStore( initState );

describe('Pruebas con las acciones del auth', () => {

    beforeEach(() => {
        store = mockStore( initState );
    });
    
    test('login y logout deben de crear la accion respectiva', () => {

        const uid = 'sdfj;asf';
        const name = 'Jonathan';

        expect( logout() ).toMatchObject({
            type: types.logout
        });

        expect( login( uid, name ) ).toEqual({
            type: types.login,
            payload: {
                uid,
                name
            }
        })
        
    })

    test('Debe de realizar el startLogout', async () => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    })

            test('Debe de iniciar el startLoginEmailPassword', async () => {
        
        await store.dispatch( startLoginEmailPassword( 'test@testing.com', '1232456' ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ type: '[UI] Start loading' });

    })
    
    

})
