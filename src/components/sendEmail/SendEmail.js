import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ListFirms from "./ListFirms";

const MainDiv = styled.div`
display: flex;
justify-content: center;
`
const Wrapper = styled.form`
display: flex;
flex-wrap: nowrap;
justify-content: center;
margin: 0;
padding: 0;
width: 40%;
`;
const Input = styled.input`
display: flex;
width: 500px;
height: 40px;
`
const Select = styled.select`
width: 500px;
height: 40px;
`
const SendEmail = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [data, setData] = useState();

  const [text, setText] = useState("");
  const [subject, setSubject] = useState(
    `Oceny użytkownika ${currentUser.name} ${currentUser.surname}`
  );
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState("");
  const [messageList, setMessageList] = useState("Pokaż listę firm");
  const clickList = () => {
    setShowList(!showList);
    if (showList) {
      setList(<ListFirms />);
      setMessageList("Ukryj listę firm");
    } else {
      setList(<div></div>);
      setMessageList("Pokaż listę firm");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setSubject(`Oceny użytkownika ${currentUser.name} ${currentUser.surname}`);
    if (number.length !== 9) {
      alert("Numer telefonu powinien składać się z 9 cyfr!");
      return;
    } else if (text.length <= 5) {
      alert("Wiadomość dla firmy powinna składać się z minimum 5 znaków.");
      return;
    } else if (email === "") {
      alert("Wybierz firmę, do której chcesz wysłać email.");
    }
    setSent(true);
    try {
      await axios.post("http://localhost:8080/send_mail", {
        text,
        email,
        currentUser,
        subject,
        number,
        data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const baseUrl = "http://localhost:8080";
    const url = baseUrl + "/showGrades/" + currentUser.id;
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

  return (
    <div>

      <button onClick={clickList}>{messageList}</button>
      <MainDiv>
      <Wrapper>
        {list}
      </Wrapper>

      {!sent ? (
        <form onSubmit={submitHandler}>
          <label>Wybierz firmę do której chcesz wysłać e-mail:</label>
          <Select
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="1998radq@gmail.com">1998radq@gmail.com</option>
            <option value="alimuns123@wp.pl">alimuns123@wp.pl</option>
            <option value="radgac000@pbs.edu.pl">radgac000@pbs.edu.pl</option>
          </Select>
          <label>Wiadomość dla firmy: </label>
          <Input
            type="textarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <label>Podaj numer telefonu</label>
          <Input
            type="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <br/>
          <button type="submit">Wyślij maila</button>
        </form>
      ) : (
        <h1>Email wysłany</h1>
      )}
          </MainDiv>
    </div>
  );
};

export default SendEmail;
