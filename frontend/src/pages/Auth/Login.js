import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div id="login">
        <h2>ReactGram</h2>
        <p className="subtitle">Entre para ver o que os seus amigos estão compartilhando.</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-mail"/>
          <input type="password" placeholder="Senha"/>
          <input type="submit" value="Entrar"/>
        </form>
        <p>Não possui uma conta? <Link to="/register">Clique aqui.</Link></p>

    
    </div>
  )
}

export default Login