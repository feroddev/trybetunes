import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userAPI";
import Loading from "../Loading";
import "./login.css";
import UserContext from "../../context/UserContext";

export default function Login() {
  const [userInfo, setUserInfo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUserInfo(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      name: userInfo,
      email: "",
      image: "",
      description: "",
    }
    setUser(data);
    await createUser(data);
    setLoading(false);
    navigate("/search");
  };

  return (
    <div className="login">
      {loading && <Loading colors="#b9b9b9" />}
      {!loading && (
        <form className="form-login" onSubmit={handleSubmit}>
          <img src="/logo.svg" alt="logo" />
          <input
            data-testid="login-name-input"
            type="text"
            name="login"
            value={userInfo}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={userInfo.length < 3}
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}
