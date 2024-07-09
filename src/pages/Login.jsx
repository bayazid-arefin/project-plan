import { useContext, useState } from "react";
import { AuthContex } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [error, setError] = useState("");
    const {signInUser}= useContext(AuthContex);
    const navigate = useNavigate();

    const handelLogIn = e => {
        e.preventDefault();
        setError("")
        const userEmail = e.target.email.value;
        const userPassword = e.target.password.value;
        if(userPassword.length <6){
            return setError("Invalid Password")
        }
        
        // sign in
        signInUser(userEmail, userPassword)
            .then(() => {
                e.target.reset();
                navigate('/')
            })
            .catch(error => {
                setError(error.code)
            })
    }
    return (
        <div className="login_box">
            <form onSubmit={handelLogIn}>
                <h4>Welcome!</h4>
                <input type="text" name="email" className="form-control my-1" placeholder="Email"/>
                <input type="password" name="password" className="form-control my-1" placeholder="Password"/>
                <button className="btn btn-primary w-100 my-1">Login</button>
            </form>
            <p className="text-danger text-center mt-3">{error}</p>
        </div>
    );
};

export default Login;