import "../../css/fontawesome.css"
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserGraduate, faBookMedical, faPersonChalkboard} from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin: 0;
padding: 0;
`;
const Button = styled.button`
display: flex;
flex-direction: row;
/* text-align: left; */
width: 325px;
height: 150px;
margin: 15px;
padding: 30px;
justify-content: space-between;
`
const ButtonTitle = styled.h5`
  margin: 5px;
`
const ButtonDescription = styled.p`
margin: 5px;
font-size: 12px;
`

const ButtonImageWrapper = styled.div`
width: 20%;
display: flex;
justify-content: center;
`
const ButtonTextWrapper = styled.div`
width: 75%;
display: flex;
flex-direction: column;
text-align: right;
`
const EmployeePanel = ({ setNumber }) => {
  return (
    <div>
    <h1>Wybierz, co chcesz zrobić</h1>
    <Wrapper>
      <Button onClick={() => setNumber(1)}><ButtonImageWrapper><FontAwesomeIcon icon={faUserGraduate} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Pokaż liste studentów</ButtonTitle><ButtonDescription>Wyświetla listę studentów w tabeli</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(2)}><ButtonImageWrapper><FontAwesomeIcon icon={faBookMedical} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Zarządzaj ocenami końcowymi</ButtonTitle><ButtonDescription>Wystaw oceny końcowe z wybranego przedmiotu</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(3)}><ButtonImageWrapper><FontAwesomeIcon icon={faPersonChalkboard} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Moje przypisane zajęcia</ButtonTitle><ButtonDescription>Sprawdź, do jakich zajęć jesteś przypisany</ButtonDescription></ButtonTextWrapper></Button>
    </Wrapper>
    </div>
  );
};

export default EmployeePanel;
