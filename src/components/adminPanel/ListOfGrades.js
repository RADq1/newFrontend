

const ListOfGrades = ({setNumber}) => {
    return(
        <div>
            Lista ocen
            <button>Pobierz pdf</button>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default ListOfGrades;