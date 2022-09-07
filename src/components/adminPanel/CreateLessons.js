const CreateLessons = ({setNumber}) => {
    return(
        <div>
            Stwórz lekcje
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default CreateLessons;