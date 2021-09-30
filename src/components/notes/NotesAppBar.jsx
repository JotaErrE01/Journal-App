import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startSaveNote } from '../../actions/notes';

const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const handleSave = () => {

        dispatch( startSaveNote( note ) );

    }

    const handleUpload = () => {
        document.querySelector( '#fileSelector' ).click();
    }  

    const handleInputChange = ({ target }) => {
        const [ file ] = target.files;

        if( file ){
            // dispatch( startUploading( file ) );
            dispatch( activeNote( note.id, { ...note, url: URL.createObjectURL(file), file } ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 agosto del 2020</span>

            <input
                id="fileSelector"
                className="btn"
                // name="file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleInputChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handleUpload}
                >Picture</button>

                <button
                    className="btn"
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
    )
}

export default NotesAppBar;