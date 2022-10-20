
const ManagementStudents = ({setNumber}) => {
    return(
        <div>
            <button onClick={() => setNumber(6)}>Przypisz studenta do kierunku</button>
            <button onClick={() => setNumber(7)}>Przepisz studenta na kolejny semestr</button>
            <button onClick={() => setNumber(8)}>Usuń studenta z bazy</button>
        </div>
    );
}

export default ManagementStudents;