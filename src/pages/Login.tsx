import LoginForm from "../components/login/LoginForm";
import CheckUserLog from "../components/CheckUserLog";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

/**
 * React component - Login page
 * @return {JSX.Element}
 */
const Login = (): JSX.Element => {
  const {userLog} = useSelector((state: RootState) => state.login)
  return (
    <>
        <CheckUserLog />
        <main>
          <section className="login">
            {userLog === false && (
              <>
                <h1 className="login__h1">Se connecter</h1>
                <LoginForm />
              </>
            )}
          </section>
        </main>
    </>
  );
};

export default Login;
