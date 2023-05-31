import SignUp from '../../components/signup/SignUp'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SignupPage = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    });
  return (
    <div><SignUp/></div>
  )
}
export default SignupPage