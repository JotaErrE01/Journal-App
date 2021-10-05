import authReducer from "../../reducres/authReducer";
import types from "../../types/types";


describe('Pruebas en el authReducer', () => {

    const initialState = { };
    
    test('Debe de retornar el state por default', () => {

        const action = {
            type: 'fasfsdafsdafsafsadsd'
        }

        const state = authReducer( initialState,  action );

        expect( state ).toEqual( initialState );

    })

    test('Debe de retornar el usuario', () => {

        const action = {
            type: types.login,
            payload: {
                uid: '12345',
                name: 'Jonathan'
            }
        }
        
        const state = authReducer( initialState, action );

        expect( state ).toEqual( action.payload );

    })

    test('Debe de hacer el logout correctamente', () => {
        
        const action = {
            type: types.logout,
            payload: {  }
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual( {  } );

    })   
    
})
