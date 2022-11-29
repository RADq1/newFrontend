import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const Button = styled.button`
display:flex;
justify-content: center;
flex-direction: row;
margin: 30px 0;
padding: 10px;
`
const Pe = styled.p`
margin: 18px;
`
const AcceptTerms = () => {
  const [accepted, setAccepted] = useState(false);
  const history = useHistory();
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div>
        <h4>Zgoda na udostępnienie listy ocen przez studenta do firm współpracujących z uczelnią</h4>
        <p>Wyrażam zgodę na przetwarzanie danych osobowych</p>
        <p>2. warunek</p>
        <p>3. warunek</p>
      </div>
      <br />
      <input
        type="checkbox"
        onChange={() => {
          setAccepted(!accepted);
        }}
      ></input>
      Wyrażam zgodę
      <Button
        onClick={() => {
          if (accepted === false) {
            alert("Nie zaakceptowałeś warunków");
            return;
          } else {
            history.push("/sendemail");
          }
        }}
      >
        <Pe>Przejdź do wyboru firmy</Pe>
      </Button>
    </div>
  );
};

export default AcceptTerms;
