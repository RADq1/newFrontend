
const EditGrades = ({ setNumber }) => {
    return(
        <div>
            <p>Co chcesz zrobić?</p>
            <div>
                <button onClick={() => setNumber(5)}>Dodaj oceny końcowe</button>
                <button onClick={() => setNumber(6)}>Edytuj ocenę końcową</button>
            </div>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default EditGrades;