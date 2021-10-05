import { 
    removeError, 
    setError, 
    uiFinishLoading, 
    uiStartLoading 
} from "../../actions/ui"
import types from "../../types/types";


describe('Pruebas en ui-actions', () => {
    
    test('Todas la acciones deben de crearse', () => {

        const action = setError( 'HELLLP!!!!!!!!' );

        expect( action ).toEqual( {
            type: types.uiSetError,
            payload: 'HELLLP!!!!!!!!'
        } );

        const removeErrorAction = removeError();
        const uiStartLoadingAction = uiStartLoading();
        const uiFinishLoadingAction = uiFinishLoading();
        
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        expect(uiStartLoadingAction).toEqual({
            type: types.uiStartLoading
        });
        expect(uiFinishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });

    })
    

})
