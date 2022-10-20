import "../../css/adminPanel.css";
const AdminPanel = ({ setNumber }) => {
  return (
    <div>
      <button onClick={() => setNumber(1)}>Stwórz studenta</button>
      <button onClick={() => setNumber(2)}>Stwórz pracownika</button>
      <button onClick={() => setNumber(4)}>Importuj oceny</button>
      <button onClick={() => setNumber(9)}>Dodaj terminy obron prac dyplomowych</button>
      <button onClick={() => setNumber(5)}>Zarządzanie studentem</button>
      <button onClick={() => setNumber(3)}>Zarządzanie zajęciami</button>
    </div>
  );
};

export default AdminPanel;
