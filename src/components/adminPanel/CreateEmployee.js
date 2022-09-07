
const CreateEmployee = ({setNumber}) => {
    return(
        <div>
            Stwórz pracownika
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default CreateEmployee;