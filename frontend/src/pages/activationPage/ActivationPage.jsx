import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 import {server} from "../../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
 
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/user/activation`,
            {
              activation_token,
            }
          );
        } catch (error) {
          setError(true);
        }
      };

      activationEmail();
    }
  }, []);
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
      {error ? (
        <p>Your token has expired</p>
      ) : (
        <p>your account has been successfully created</p>
      )}
    </div>
  );
};
export default ActivationPage;
