import React, { useState, useEffect } from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from "axios";

const GoogleEventComponent = () => {

    const responseGoogle = (res) => {
        console.log(res)
        const {code} = res
        axios.post('http://localhost:8080/api/create-tokens', {code})
            .then(res=> {
                console.log(res.data)
                setSignedIn(true)
            })
            .catch(err=> console.log(err.message))
    }
    const responseError = (err) => {
        console.log(err)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(summary, description, location, startDateTime, endDateTime)
        axios.post('http://localhost:8080/api/create-event', {
            summary,
            description,
            location,
            startDateTime,
            endDateTime
        }).then(res=> {
            console.log(res.data)
        })
        .catch(err=> console.log(err.message))
    }

    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [signedIn, setSignedIn] = useState(false);

    return(
    <div>
    <div>
        <h2>Formularz dodawania terminów obron prac dyplomowych</h2>
    </div>
    {
        !signedIn ? (<div>
            <GoogleLogin clientId='628486044277-q4rpr485ikcvtlsu80klkba6lvglvogm.apps.googleusercontent.com'
            buttonText='Zaloguj się do kalendarza google'
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
            responseType='code'
            accessType='offline'
            scope='openid email profile https://www.googleapis.com/auth/calendar'
            />
        </div>) : (<div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='summary'>Temat pracy dyplomowej</label>
            <input type="text" id='summary' value={summary} onChange={e => setSummary(e.target.value)}/>
            <br/>
            <label htmlFor='description'>Opis, numer pracy dyplomowej</label>
            <textarea id='summary' value={description} onChange={e => setDescription(e.target.value)}/>
            <br/>
            <label htmlFor='location'>Adres, sala obron</label>
            <input type="text" id='location' value={location} onChange={e => setLocation(e.target.value)}/>
            <br/>
            <label htmlFor='startDateTime'>Początek obrony</label>
            <input type="datetime-local" id='startDateTime' value={startDateTime} onChange={e => setStartDateTime(e.target.value)}/>
            <br/>
            <label htmlFor='startDateTime'>Koniec obrony</label>
            <input type="datetime-local" id='endDateTime' value={endDateTime} onChange={e => setEndDateTime(e.target.value)}/>
            <button type="submit">Dodaj godziny obron</button>
        </form>
    </div>)
    }
    </div>
    );
}

export default GoogleEventComponent;