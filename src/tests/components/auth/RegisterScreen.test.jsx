import { render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import RegisterScreen from "../../../components/auth/RegisterScreen";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

describe('Pruebas en el componente <LoginScreen />', () => {

    const mockStore = configureStore([ thunk ]);
    const initState = {
        auth: { },
        ui: {
            loading: false,
            msg: null
        }
    }

    let store;

    let wrapper;

    beforeEach( () => {

        store = mockStore( initState );
        
        wrapper = render(
            <MemoryRouter>
                <Provider store= {store}>
                    <RegisterScreen />
                </Provider>
            </MemoryRouter>
        );
    } );

    
    test('Debe de hacer match con el sanpshot', () => {
        
        expect( wrapper.container ).toMatchSnapshot();

    })

    test('Debe de hacer el dispatch de la accion respectiva', () => {
        
        const { container } = wrapper;
        const [ name, email, pass, pass2 ] = container.querySelectorAll( '.auth__input' );

        userEvent.type( name, '' );
        userEvent.type( email, 'correo@correo.com' );
        userEvent.type( pass, '123456' );
        userEvent.type( pass2, '123456' );
        
        userEvent.click( container.querySelector('.btn-block') );

        const actions = store.getActions();

        expect( actions.length ).toBe( 1 );

    })    

    test('Debe de mostrar el mensaje de error', () => {

        const initState = {
            auth: { },
            ui: {
                loading: false,
                msgError: 'Nombre es obligatorio'
            }
        }

        store = mockStore( initState );
        
        wrapper = render(
            <MemoryRouter>
                <Provider store= {store}>
                    <RegisterScreen />
                </Provider>
            </MemoryRouter>
        );

        const { container } = wrapper;

        userEvent.click( container.querySelector('.btn-block') );
        expect( container.querySelector('.auth__alert-error') ).toBeInTheDocument();

    })    

})