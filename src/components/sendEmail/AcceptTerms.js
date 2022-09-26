import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
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
        <p>1. warunek</p>
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
      Akceptuje warunki
      <button
        onClick={() => {
          if (accepted === false) {
            alert("Nie zaakceptowałeś warunków");
            return;
          } else {
            history.push("/sendemail");
          }
        }}
      >
        Przejdź do wyboru firmy
      </button>
    </div>
  );
};

export default AcceptTerms;
