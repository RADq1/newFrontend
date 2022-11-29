import "../../css/adminPanel.css";
import styled from "styled-components";
import "../../css/fontawesome.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser, faFileImport, faCalendarDays, faPeopleRoof, faBookBookmark} from '@fortawesome/free-solid-svg-icons'

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

const AdminPanel = ({ setNumber }) => {
  return (
    <div>
      <div><h1>Wybierz, co chcesz zrobić</h1></div>
      <br/>
      <Wrapper>
      <Button onClick={() => setNumber(1)}><ButtonImageWrapper><FontAwesomeIcon icon={faGraduationCap} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Stwórz studenta</ButtonTitle><ButtonDescription>Tworzenie kont studentów</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(2)}><ButtonImageWrapper><FontAwesomeIcon icon={faUser} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Stwórz pracownika</ButtonTitle><ButtonDescription>Tworzenie kont pracowników</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(4)}><ButtonImageWrapper><FontAwesomeIcon icon={faFileImport} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Importuj oceny</ButtonTitle><ButtonDescription>Import ocen z pliku Excel</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(9)}><ButtonImageWrapper><FontAwesomeIcon icon={faCalendarDays} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Dodaj terminy obron</ButtonTitle><ButtonDescription>Dodawanie terminów obron prac dyplomowych do kalendarza Google</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(5)}><ButtonImageWrapper><FontAwesomeIcon icon={faPeopleRoof} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Zarządzaj studentami</ButtonTitle><ButtonDescription>Przypisywanie studenta do kierunku, semestru lub usuwanie kont</ButtonDescription></ButtonTextWrapper></Button>
      <Button onClick={() => setNumber(3)}><ButtonImageWrapper><FontAwesomeIcon icon={faBookBookmark} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Zarządzaj zajęciami</ButtonTitle><ButtonDescription>Twórz zajęcia oraz przypisuj do wykładowcy</ButtonDescription></ButtonTextWrapper></Button>
      </Wrapper>
    </div>
  );
};

export default AdminPanel;
