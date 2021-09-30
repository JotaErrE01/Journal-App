import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleActive = () => {
        dispatch( activeNote( id, { title, body, url, date } ) );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeInLeft animate__faster"
            onClick={handleActive}
        >
            {
                url &&
                    <div 
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${ url })`,
                            backgroundPosition: 'center'
                        }}
                    ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format("dddd") }</span>
                <h4>{ noteDate.format("Do") }</h4>
            </div>
        </div>
    )
}

export default JournalEntry;