import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { loadNotes } from "../helpers/LoadNotes";
import { fileUpload } from "../hooks/fileUpload";
import types from "../types/types";

const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
            // await Swal.fire( 'Nota Agregada', 'La nota fue agregada con exito', 'success' );

            // console.log(docRef);

            dispatch( activeNote( docRef.id, newNote ) );

            dispatch( addNewNote({ id: docRef.id, ...newNote }) );

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
};

const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

const addNewNote = note => ({
    type: types.notesAddNew,
    payload: note
})

const startLoadinNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
};

const setNotes = notes => ({
    type: types.notesLoad,
    payload: notes
});

const startSaveNote = note => {
    return async (dispatch, getState) => {

        Swal.fire({ 
            title: 'Uploading...', 
            text: 'Please Wait',
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading();
            }
        })

        const { uid } = getState().auth;

        const noteFiresotore = { ...note };

        if( !note.url ) delete noteFiresotore.url;
        
        // Agregar Image
        if( note.file ){
            const fileUrl = await fileUpload( note.file ); // sube el archivo a cloud dinary

            noteFiresotore.url = fileUrl;

            // eliminar datos no soportados por firebase
            delete noteFiresotore.file;
        }

        // eliminar el id del objeto
        delete noteFiresotore.id;

        try {
            const docRef = doc(db, `${ uid }/journal/notes/${ note.id }`); // referencia al doc

            // actualizamos el doc
            await updateDoc(docRef, noteFiresotore);

            dispatch( refreshNote( { ...noteFiresotore, id: note.id } ) );

            Swal.fire("Nota Actualizada", "Nota actualizada correctamente", "success");

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Error al actualizar la nota", "error");
        }
        
    }    
}

const refreshNote = note => ({
    type: types.notesUpdated,
    payload: note
})

// const startUploading = ( file ) => {
//     return async (dispactch, getState) => {
//         const { active: note } = getState().notes;
        
//         const url = URL.createObjectURL(file);

//         console.log(url);

//         console.log(URL.revokeObjectURL( url ));
        
//         dispactch( activeNote( note.id, { ...note, url } ) );
//     }
// }

const startDeleting = id => {
    return async (dispactch, getState) => {

        const uid = getState().auth.uid;
          
        const result = await Swal.fire({
            title: 'Estas seguro?',
            text: "Los datos eliminados no se podran recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        })

        if (result.isConfirmed) {

            // eliminar de firesatore
            await deleteDoc(doc(db, `${ uid }/journal/notes/${ id }`));

            // eliminar nota de la memoria
            dispactch( deleteNote( id ) );

            Swal.fire(
                'Eliminado!',
                'Tu nota ha sido eliminada exitosamente.',
                'success'
            )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelado',
                'Nota no eliminada',
                'error'
            )
        }

    }
}

const deleteNote = id => ({
    type: types.notesDelete,
    payload: id
})

const noteLogout = () => ({
    type: types.notesLogoutCleaning
})

export {
    startNewNote,
    activeNote,
    setNotes,
    startLoadinNotes,
    startSaveNote,
    // startUploading,
    startDeleting,
    noteLogout
}