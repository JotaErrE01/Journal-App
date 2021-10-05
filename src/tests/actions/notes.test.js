/** * @jest-environment node */

import { db } from "../../firebase/config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadinNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import types from '../../types/types';

// const middlewares = [ thunk ];
const mockStore = configureStore([ thunk ]);

const initState = {
    auth: {
        uid: '12345'
    },
    notes: {
        active: {
            id: 'A1oSop9QBaxstHppwhpr',
            title: 'hola',
            body: 'mundo'
        }
    }
}

let store = mockStore( initState );

describe('Pruebas con las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore( initState )
    });
    
    test('Debe de crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        const [ { payload: { id } } ] = actions;

        expect( actions.length ).toBe( 2 );

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }    
        });

        await deleteDoc(doc(db, `12345/journal/notes/${ id }`));

    })

    test('startLoading notes debe de cargar las notas', async () => {
        
        await store.dispatch( startLoadinNotes() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

    })    

    test('startSaveNote Debe de actualizar la nota', async () => {

        const note = {
            id: 'A1oSop9QBaxstHppwhpr',
            title: 'title',
            body: 'body',
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = doc(db, `12345/journal/notes/${ note.id }`);

        const docSnap = await getDoc(docRef);

        expect( docSnap.data().title ).toBe( note.title );
        
    })
    
    // test('startUploading debe de actualizar el url de la active note', async () => {
        
    //     const file = new File( [], 'foto.jpg' );

    //     await store.dispatch( startUploading( file ) );

    // })

})
