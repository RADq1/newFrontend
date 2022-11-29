import styled from "styled-components";
import "../../css/fontawesome.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleLeft, faPlus, faPen} from '@fortawesome/free-solid-svg-icons'

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
const EditGrades = ({ setNumber }) => {
    return(
        <div>
        <p>Co chcesz zrobić?</p>
        <Wrapper>
            <Button onClick={() => setNumber(5)}><ButtonImageWrapper><FontAwesomeIcon icon={faPlus} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Dodaj oceny końcowe</ButtonTitle><ButtonDescription>Wybierz przedmiot, następnie wpisz oceny dla studentów</ButtonDescription></ButtonTextWrapper></Button>
            <Button onClick={() => setNumber(6)}><ButtonImageWrapper><FontAwesomeIcon icon={faPen} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Edytuj ocenę</ButtonTitle><ButtonDescription>Zmień ocenę danego studenta z wybranego przedmiotu</ButtonDescription></ButtonTextWrapper></Button>
            <Button onClick={() => setNumber(0)}><ButtonImageWrapper><FontAwesomeIcon icon={faCircleLeft} class="images"/></ButtonImageWrapper><ButtonTextWrapper><ButtonTitle>Wróć</ButtonTitle><ButtonDescription>Wróć do wyboru czynności</ButtonDescription></ButtonTextWrapper></Button>
        </Wrapper>
        </div>
      
    );
}

export default EditGrades;