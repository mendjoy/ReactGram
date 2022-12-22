import "./Auth.css";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { login, reset } from "../../slices/authSlice";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.auth);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };
    dispatch(login(user));
  };

  //clean all auth states
  useEffect(() => {

    dispatch(reset());

  }, [dispatch])

  
  return (
    <div id="login">
        <h2>ReactGram</h2>
        <p className="subtitle">Entre para ver o que os seus amigos estão compartilhando.</p>

        <form onSubmit={handleSubmit}>
          <input type="email" 
            placeholder="E-mail" 
            onChange={(e)=> setEmail(e.target.value)} 
            value={email || ""}/>

          <input type="password" 
            placeholder="Senha" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password || ""}/>

          {!loading && <input type="submit" value="Entrar"></input>}
          {loading && <input type="submit" value="Aguarde..."></input>}
          {error && <Message msg={error} type="error"/>}

        </form>
        <p>Não possui uma conta? <Link to="/register">Clique aqui.</Link></p>

    </div>
  )
}

export default Login