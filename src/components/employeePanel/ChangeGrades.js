import { useEffect, useState, useReducer } from "react";
import { useSelector} from "react-redux";
import axios from "axios";

import { SET_ERROR, SET_GRADES, SET_NEW_GRADE } from "../../shared/constants/gradeReducerAction";
import styled from "styled-components";
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const gradeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRADES':
      return {
        ...state,
        grades: action.grades
      }
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        grades: null,
        error: action.error
      }
    case 'SET_NEW_GRADE':
      return {
        ...state, //Tutaj mamy sobie stan w reducerze z flagami loading, error no i tablica grades (... spread operator powoduje, ze te flagi jak loading, error nie zostana utracone wraz ze zmianami. Jedyne co robimy to modyfikujemy tablice grades, taki jest cel)
        grades: state.grades.map((grade) => grade.id === action.payload.id //Tutaj mamy tablice grades, mapujemy sobie po wszystkich obiektach sprawdzając czy dany obiekt z ocena ma takie samo id jak przekażemy w dispatch, czyli pozwoli to odróżnić jaki input no bo każdy input ma swoje data.id a więc to data.id będzie przekazane w payload i no pozwoli nam to zrobić. :)
        ? {...grade, grade: action.payload.grade ? action.payload.grade : null} //A tutaj mamy warunek trójargumentowy po polsku mówiąc, czyli znowu mamy {...grade} co oznacza, że jak mamy w obiekcie grade więcej pól niż tylko grade np. null albo ten obiekt users, etc. No to też nie chcemy tego przy return stracić a zmodyfikować jedynie grade. Więc skoro nie chcemy stracić, używamy spread operatora czyli pozostaw przy zwracaniu wszystkie pozostałe właściwości obiektu i zmodyfikuj tylko tą wskazaną. :)
        : grade //No a w przypadku kiedy grade.id !== od action.payload.id no to wtedy nie chcemy zmieniać obiektu no bo po co. Więc zwracamy go w czystej formie w takiej jak był wcześniej już w state reducera w tablicy grades.
        )
      };
    default:
    return state;
  }
}

const ChangeGrades = ({ setNumber }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    // const [grades, setGrades] = useState(null);
    const [state, dispatch] = useReducer(gradeReducer, {
      loading: true,
      grades: null,
      error: null
    });
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState(null);

    console.log('stateGrade', state);

    const change = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showGradeForChange/" + value
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              // setGrades(grades);
              dispatch({ type: SET_GRADES, grades: res.data.data })
              if (!data) return;
            } else {
              alert("Bład");
            }
          })
          .catch((error) => {
            alert("Błąd po stronie serwera" + error);
            dispatch({ type: SET_ERROR, error: 'Problem z pobraniem listy ocen oraz użytkowników'});
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
        const baseUrl = "http://localhost:8080/addGrades";
          try {
            axios
              .post(baseUrl, {
                grades: state.grades,
              })
              .then((res) => {
                console.log(res)
                alert("Zaaktualizowano oceny")
              });
          } catch (e) {
            console.log(e);
          }
        }

        return(
        <Wrapper>
            <p>Wybierz przedmiot, z którego chcesz zmienić oceny</p>
            <form onSubmit={() => {}}>
            <select onChange={change}>
            {data?.map((data) => {
            return <option key={data.id} value={data.id}>{data.name}, semestr: {data.semestr}</option>
            })}
            </select>
            <table>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Ocena</th>
                </tr>
                {state.grades?.map(({user, id, grade}) => {
                return <>
                    {grade === null ? "" : <tr>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <input key={id} value={grade} type="number" step="0.5" min="2" max="5" onChange={(event) => {
                            dispatch({ type: SET_NEW_GRADE, payload: { id, grade: event.target.value }})
                            }}/>
                        </tr>}
                    </>
            })}
            </table>
            <button type="submit" onClick={sendGrades}>Zaaktualizuj listę ocen</button>
            </form>
            <button onClick={() => setNumber(2)}>Wróć</button>
        </Wrapper>
    );
}

export default ChangeGrades;