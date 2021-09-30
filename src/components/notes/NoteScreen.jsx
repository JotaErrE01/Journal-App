import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);

    const dispatch = useDispatch();

    const [ formValues, handleInputChange, reset ] = useForm(note);

    const { title, body } = formValues;

    const activeId = useRef( note.id ); // referencia en memoria

    const activeUrl = useRef( note.url );

    useEffect(() => {
        
        // Evitar ciclo infinito
        if( activeId.current !== note.id || activeUrl.current !== note.url ){
            reset( note );
            activeId.current = note.id;
            activeUrl.current = note.url;
        }

    }, [note, reset]);

    // tambien puede ser en el handleInputChange, pero no tenemos  acceso a el desde este componente
    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder="What Happend Today"
                    className="notes__text-area"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    note.url &&
                        <div className="notes__image">
                            <img 
                                src={`${ note.url }`} 
                                alt="Journal"
                            />
                        </div>
                }
            </div>

            <button 
                className="btn btn-danger"
                onClick={ () => dispatch( startDeleting( note.id ) ) }
            >Delete</button>

        </div>
    )
}

export default NoteScreen;