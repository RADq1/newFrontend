import styled from "styled-components";
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const ChangeGrades = ({ setNumber }) => {
    return(
        <Wrapper>
            <p>Zmień ocenę konkretnego użytkownika z konkretnego przedmiotu</p>
            TODO
            <button onClick={() => setNumber(2)}>Wróć</button>
        </Wrapper>
    );
}

export default ChangeGrades;