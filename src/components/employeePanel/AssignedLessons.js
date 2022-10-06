import { useEffect, useState } from "react";
import axios from "axios";

const AssignedLesson = ({ setNumber, currentUser }) => {
    const [data, setData] = useState();
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
    return(
        <div>
            <p>Przypisane zajęcia dla {currentUser.title} {currentUser.name}</p>
            <table>
                <tr>
                    <th>Nazwa przedmiotu</th>
                    <th>Rodzaj</th>
                    <th>Semestr</th>
                </tr>
                {data?.map((data) => (
                <tr>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td>{data.semestr}</td>
                </tr>))}
            </table>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default AssignedLesson;