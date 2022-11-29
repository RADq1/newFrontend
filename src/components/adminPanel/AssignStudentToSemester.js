
const AssignStudentToSemester = ({setNumber}) => {
    return(
        <div>
            <h1>Przypisz studenta do semestru</h1>
            <button onClick={() => setNumber(5)}>Wróć</button>
        </div>
    );
}

export default AssignStudentToSemester;