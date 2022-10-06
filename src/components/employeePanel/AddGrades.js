import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
// import { useForm } from "react-hook-form";
import axios from "axios";
import { setIn } from "formik";
const AddGrades = ({ setNumber }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    const [grades, setGrades] = useState(null);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    // const [gradeInput, setGradeInput] = useState([]);
    // const {handleSubmit, register, setValue: setValues, formState: { errors },} = useForm();
    // const currentListGrades = data?.filter((grade) => {
    //     return grade.Lesson.name === value;
    // })
    const change = (e) => {
        setValue(e.target.value);
    }
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showGrade/" + value
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const grades = res.data.data;
              console.log(grades);
              setGrades(grades);
              if (!grades) return;
            } else {
              alert("Bład");
            }
          })
          .catch((error) => {
            alert("Błąd po stronie serwera" + error);
          });
        // eslint-disable-next-line
      }, [value]);
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showAssignedLessons/" + currentUser.id;
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              console.log(data);
              setData(data);
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
    const sendGrades = (e) => {
        e.preventDefault()
        console.log(value)
        console.log(grades)
        console.log(inputValue);
        const baseUrl = "http://localhost:8080/addGrades";
          try {
            axios
              .post(baseUrl, {
                grades: grades,
              })
              .then((res) => console.log(res));
          } catch (e) {
            console.log(e);
          }
    }
    const changeGrade = (e, id) => {
      const filterGrades = grades.map((item) => {
        // console.log("grade id: ", grade.id)
        if(item.id === id)
        {
          const xd = {...item, grade: e.target.value}
          console.log(xd);
          return xd;
        } else {
          console.log("nie")
          return item;
        }
      })
      // const newGrades = grades.map((item, index) => {
      //    return {...item, grade: e.target.value}
      // })
    }

    const handleChangeInput = (e, index, id) => {
      // setGrades(newArray);
      let newArray;
      newArray = [...grades];
      grades.forEach((grade) => {
        if(grade.id === id)
        {
          setGrades(
            grades.map(item =>
                item.id === index
                ? {...item, grade : e.target.value}
                : item
          ))
          newArray[index] = {...grade, grade: e.target.value};
          console.log("index z if",index);
        }
        // else{
        //   newArray[index] = grade;
        //   console.log("index z else",index);
        // }
      })
      console.log("newArray", newArray);
      // setGrades(newArray);
 
      // console.log(newInputFields)
      // setGrades(newArray)
      // setInputValue(newInputFields);
      // setGrades((prevState) => (
      //   [...prevState, newInputFields]
      // ));
      // console.log(newInputFields);
    }
        return(
        <div>
            <p>Wybierz przedmiot</p>
            <form onSubmit={sendGrades}>
            <select onChange={change}>
            {data?.map((data) => {
            return <option value={data.id}>{data.name}, semestr: {data.semestr}</option>
            })}
            </select>
            <table>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Ocena</th>
                </tr>
            {grades?.map((data, index) => {
                return  <tr>
                <td>{data.user.name}</td>
                <td>{data.user.surname}</td>
                {/* step="0.5" */}
                <input key={data.id} type="number" min="2" max="5" onChange={(e) => handleChangeInput(e, index, data.id)}>{data.grade}</input>
                </tr>
            })}
            </table>
            {/* {currentListGrades?.map((grade) => {
                    return <div>
                        <input type="number"/>
                    </div>
                })} */}
            <button type="submit" onClick={() => {}}>Dodaj oceny</button>
            </form>
            <button onClick={() => setNumber(2)}>Wróć</button>
        </div>
    );
}

export default AddGrades;