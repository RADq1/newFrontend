import React, { useState, useEffect} from "react";
import axios from "axios";
const DeleteStudent = ({setNumber}) => {
    const [studentPicked, setStudentPicked] = useState(null)
    const [studentList, setStudentList] = useState(null)
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showStudentList/";
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              console.log(data);
              setStudentList(data);
              if (!data) return;
            } else {
              alert("Bład");
            }
          })
          .catch((error) => {
            alert("Błąd po stronie serwera" + error);
          });
        // eslint-disable-next-line
      }, []);

    const handleSelectStudent = (e) => {
        console.log(e.target.value);
        setStudentPicked(e.target.value);
    }

    const sendUpdateField = (e) => {
        e.preventDefault()
        const baseUrl = "http://localhost:8080/deleteStudent";
        console.log(studentPicked)
        try{
            axios
                .post(baseUrl, {
                    id: studentPicked,
                })
                .then((res) => {
                    console.log(res)
                    alert("Student usunięty pomyślnie")
                });
        } catch (e) {
            console.log(e)
        }
    }
    return(
        <div>
                <form onSubmit={sendUpdateField}>
                <label>Wybierz studenta, którego chcesz usunąć</label>
                <select onChange={handleSelectStudent}>
                    {studentList?.map(student => {
                        return <option value={student.id}>{student.name} {student.surname}, indeks: {student.indexNumber}</option>
                    })}
                </select>
                <button>Usuń studenta</button>
            </form>
            <button onClick={() => setNumber(5)}>Wróć</button>
        </div>
    );
}

export default DeleteStudent;