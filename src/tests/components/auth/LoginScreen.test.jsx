import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import LoginScreen from "../../../components/auth/LoginScreen";
import '@testing-library/jest-dom';
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";

jest.mock( "../../../actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}) );

// const middleware = [ thunk ];
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

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore( initState );
        store.dispatch = jest.fn();
        wrapper = render(

            <Provider store={ store } >
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
            
        );
    })


    test('Debe de hacer match con el snapshot', () => {
        
        expect( wrapper.container ).toMatchSnapshot();

    })

    test('Debe de disparar la accion de startGoogleLogin y de removeError', () => {

        userEvent.click( screen.getByText( 'Sign in with google' ) );

        expect( startGoogleLogin ).toHaveBeenCalled();

    })

    test('Debe de disparar el startLogin con los respectivos argumentos', () => {
        
        const { container } = wrapper;
        const [ email, pass ] = container.querySelectorAll( '.auth__input' );

        userEvent.type( email, 'correo@correo.com' );
        userEvent.type( pass, '123456' );
        userEvent.click( container.querySelector( '.btn-block' ) );

        expect( startLoginEmailPassword ).toHaveBeenCalled();
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('correo@correo.com', '123456');

    })

})