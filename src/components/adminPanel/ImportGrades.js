import React, { useState, useEffect} from "react";
import axios from "axios";
const ImportGrades = ({setNumber}) => {
    const [file, setFile] = useState(null);
    const [studentList, setStudentList] = useState(null)
    const [studentPicked, setStudentPicked] = useState(null)
    const [importedFromSchool, setImportedFromSchool] = useState(null)

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

    const handleSelectSchool = (e) => {
        console.log(e.target.value);
        setImportedFromSchool(e.target.value);
    }

    const sendExcelFile = async (e) => {
        e.preventDefault()
        if(file === null) { return alert("Nie przesłano pliku")}
        if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { return alert("Wyślij plik w formacie excel!")}
        else{
            const baseUrl = "http://localhost:8080/importGrades";
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", studentPicked);
            formData.append("importedFrom", importedFromSchool)
            axios
                .post(baseUrl, formData)
                .then((res) => {
                alert("File Upload success");
                })
                .catch((err) => alert("File Upload Error"))
                    }
                }

    const handleFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
        const file = e.target.files[0];
        if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            return alert("Plik musi być typu *.xlsx!")
        }
    }
    
    return(
        <div>
        <form onSubmit={sendExcelFile}>
            <label>Wybierz nazwę szkoły z której importujesz</label>
            <select onChange={handleSelectSchool}>
                <option value="WSB w Bydgoszczy">Wyższa Szkoła Bankowa w Bydgoszczy</option>
                <option value="UKW w Bydgoszczy">Uniwersystet Kazimierza Wielkiego w Bydgoszczy</option>
                <option value="WSG w Bydgoszczy">Wyższa Szkoła Gospodarki w Bydgoszczy</option>
            </select>
            <label>Wybierz użytkownika, dla którego chcesz zaimportować oceny</label>
            <select onChange={handleSelectStudent}>
                {studentList?.map(student => {
                    return <option value={student.id}>{student.name} {student.surname}, indeks: {student.indexNumber}</option>
                })}
            </select>
            <label>Wybierz plik, który chcesz wysłać (*.xlsx)</label>
            <input type="file" name="file" onChange={(e)=> handleFile(e)}></input>
            <button>Importuj oceny z innej szkoły</button>
        </form>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default ImportGrades;
