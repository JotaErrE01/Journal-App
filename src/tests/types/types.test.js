import types from "../../types/types"


describe('Pruebas en types.js', () => {

    const typesObj = {

        // Autentication types
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        // ui types
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
        
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        //notes
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated Note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout cleaning',
    
    }
    
    test('Debe de ser igual al objeto', () => {
        expect( types ).toEqual( typesObj );
    })

})
