

const EmployeePanel = ({ setNumber }) => {
  return (
    <div>
      <button onClick={() => setNumber(1)}>Pokaż liste studentów</button>
      <button onClick={() => setNumber(2)}>Zarządzaj ocenami końcowymi</button>
      <button onClick={() => setNumber(3)}>Przypisane zajęcia</button>
      <button onClick={() => setNumber(4)}>Dodaj godziny konsultacji</button>
    </div>
  );
};

export default EmployeePanel;