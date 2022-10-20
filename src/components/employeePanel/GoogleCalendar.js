import GoogleEventComponent from './GoogleEventComponent';
const GoogleCalendar = ({setNumber}) => {
    return(
        <div>
             <GoogleEventComponent />
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default GoogleCalendar;