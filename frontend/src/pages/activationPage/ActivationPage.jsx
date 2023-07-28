// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
//  import {server} from "../../server";

// const ActivationPage = () => {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
 
//   useEffect(() => {
//     if (activation_token) {
//       const activationEmail = async () => {
//         try {
//           const res = await axios.post(
//             `${server}/user/activation`,
//             {
//               activation_token,
//             }
//           );
//         } catch (error) {
//           setError(true);
//         }
//       };

//       activationEmail();
//     }
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//         display: "flex",
//       }}
//     >
//       {error ? (
//         <p>Your token has expired</p>
//       ) : (
//         <p>your account has been successfully created</p>
//       )}
//     </div>
//   );
// };
// export default ActivationPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activateAccount = async () => {
        try {
          const res = await axios.post(
            `${server}/activation`, // Update the route URL if needed
            {
              activation_token,
            }
          );

          if (res.data.success) {
            // Account activation successful
            setErrorMessage("Your account has been successfully activated!");
          } else {
            // Account activation failed with some specific error message
            setErrorMessage(res.data.message || "Account activation failed.");
          }
        } catch (error) {
          // Account activation failed due to a network error or server issue
          // setErrorMessage("An error occurred while activating your account.");
          console.log(error);
        }
      };

      activateAccount();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {errorMessage ? <p>{errorMessage}</p> : <p>Activating your account...</p>}
    </div>
  );
};

export default ActivationPage;
