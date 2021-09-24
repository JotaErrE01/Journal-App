import React from 'react'
import JournalEntries from './JournalEntries';

const Sidebar = () => {
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5 journal__sidebar-username">
                    <i className="fa-solid fa-user"></i>
                    <span>Jonathan</span>
                </h3>

                <button
                    className="btn"
                >Logout</button>
            </div>

            <div className="journal__new-entry">
                <i className="fa-solid fa-calendar-day fa-4x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}

export default Sidebar;