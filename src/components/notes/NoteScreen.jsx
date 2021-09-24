import React from 'react'
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea 
                    placeholder="What Happend Today"
                    className="notes__text-area"
                ></textarea>

                <div className="notes__image">
                    <img 
                        src="https://i.pinimg.com/originals/cc/18/8c/cc188c604e58cffd36e1d183c7198d21.jpg" 
                        alt="Image" />
                </div>
            </div>
        </div>
    )
}

export default NoteScreen;