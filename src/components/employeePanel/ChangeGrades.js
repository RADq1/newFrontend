
const ChangeGrades = ({ setNumber }) => {
    return(
        <div>
            <p>Zmień ocenę konkretnego użytkownika z konkretnego przedmiotu</p>
            <button onClick={() => setNumber(2)}>Wróć</button>
        </div>
    );
}

export default ChangeGrades;