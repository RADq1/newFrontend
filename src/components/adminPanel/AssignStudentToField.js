import React, { useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
const Button = styled.button`
display: flex;
flex-direction: row;
padding: 30px;
`

const AssignStudentToField = ({setNumber}) => {
    const [studentList, setStudentList] = useState(null)
    const [fieldOfStudyList, setFieldOfStudyList] = useState(null)
    const [studentPicked, setStudentPicked] = useState(null)
    const [fieldOfStudyPicked, setFieldOfStudyPicked] = useState(null)
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

      useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showAllFieldOfStudies/";
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              console.log(data);
              setFieldOfStudyList(data);
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
    const handleSelectFieldOfStudy = (e) => {
        console.log(e.target.value);
        setFieldOfStudyPicked(e.target.value);
    }
    const sendUpdateField = (e) => {
        e.preventDefault()
        const baseUrl = "http://localhost:8080/updateStudentFieldOfStudy";
        console.log(studentPicked)
        try{
            axios
                .post(baseUrl, {
                    id: studentPicked,
                    fieldOfStudy: fieldOfStudyPicked,
                })
                .then((res) => {
                    console.log(res)
                });
        } catch (e) {
            console.log(e)
        }
    }
    return(
        <div>
            <form onSubmit={sendUpdateField}>
                <label>Wybierz użytkownika, dla którego chcesz przypisać kierunek studiów</label>
                <select onChange={handleSelectStudent}>
                    {studentList?.map(student => {
                        return <option value={student.id}>{student.name} {student.surname}, indeks: {student.indexNumber}</option>
                    })}
                </select>
                <label>Wybierz kierunek do którego chcesz przypisać studenta</label>
                <select onChange={handleSelectFieldOfStudy}>
                    {fieldOfStudyList?.map(fieldOfStudy => {
                        return <option value={fieldOfStudy.id}>{fieldOfStudy.name}</option>
                    })}
                </select>
                <Button>Przypisz kierunek studiów</Button>
            </form>
            <button onClick={() => setNumber(5)}>Wróć</button>
        </div>
    );
}

export default AssignStudentToField;