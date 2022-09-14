import React from "react";
const MyGrades = () => {
  return (
    <div>
      <p>Lista ocen studenta </p>
      <table>
        <thead>
          <tr>
            <th>Przedmiot</th> <th>Ocena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Matematyka</th> <td>4+</td>
          </tr>
          <tr>
            <th>Historia</th> <td>3-</td>
          </tr>
          <tr>
            <th>Fizyka</th> <td>2</td>
          </tr>
          <tr>
            <th>Fizyka</th> <td>4</td>
          </tr>
        </tbody>
      </table>
      <button>Wyślij oceny wybranej firmie</button>
    </div>
  );
};

export default MyGrades;
