
import styled from "styled-components";
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const Table = styled.table`
  th,
  td {
    text-align: center;
    padding: 15px;
    border: 1px solid black;
  }
  th {
    /* color: rgb(220, 40, 40); */
    font-style: bold;
  }
`;
const Contact = () => {
    return (
        <Wrapper>
            <h3>Kontakt</h3>
            <p>Helpdesk techniczny
            1998radq@gmail.com
            </p>
            <p>Politechnika Bydgoska im. Jana i Jędrzeja Śniadeckich</p>
            <h3>Dziekanat</h3>
            <Table>
                <tr>
                    <th>Nazwa dziekanatu</th>
                    <th>Numer telefonu</th>
                </tr>
                <tr>
                    <td>WTiE</td>
                    <td>664-887-989</td>
                </tr>
                <tr>
                    <td>ZARZ</td>
                    <td>998-997-456</td>
                </tr>
                <tr>
                    <td>BAiS</td>
                    <td>678-554-960</td>
                </tr>
            </Table>
        </Wrapper>
)
}
export default Contact;