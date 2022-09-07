import "../../css/adminPanel.css"
const AdminPanel = ({setNumber}) => {
    return(
        <div>
            {/* <button onClick={() => setShowComponent(prevValue => !prevValue)}>Stwórz studenta</button> */}
            <button onClick={() => setNumber(1)}>Stwórz studenta</button>
            <button onClick={() => setNumber(2)}>Stwórz pracownika</button>
            <button onClick={() => setNumber(3)}>Stwórz zajęcia</button>
            <button onClick={() => setNumber(4)}>Pobierz liste ocen studenta dla firm</button>
            {/* <button>Przypisz pracownika do zajęć</button>
            <button>Przypisz pracownika do grupy</button> */}
        </div>
    );
}

export default AdminPanel;