import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Login.css"
import { useState, } from "react";
import { handleSuccess, handleError } from "../Utils/toatMessage.js";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        Email: "",
        Password: "",
    });

    const { Email, Password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BASE_URL}/Login`, { ...inputValue }, { withCredentials: true });
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/ShopkeeperWrapper");
                }, 1000);
            }
            else {
                handleError(message);
            }
        }
        catch (error) {
            console.log("status is:", error.response.status);
            console.log("success :", error.response.data.success);
            console.log("message :", error.response.data.message);
        }
    }

    const handleGuest = async () => {

        await axios.post(`${BASE_URL}/Logout`, {}, { withCredentials: true });
        navigate("/ShopkeeperWrapper");
    }
    return (
        <>
            <div className="bodyPage" id="bodyPage">
                <div className="upperSection">
                    <div className="cartAndName">
                        <img src="VegeCart.png" alt="vegeCart" className="vegCart" />
                        <h1 className="namePart">Market Price Checker</h1>
                    </div>
                </div>
                <div className="loginSection">
                    <form onSubmit={handleOnSubmit}>
                        <div className="loginName">
                            <h1 className="loginH1">Log In</h1>
                        </div>
                        <div className="emailBox">
                            <i className="fa-regular fa-envelope"></i>
                            <input type="text" placeholder="Enter Email Address" name="Email" value={Email} onChange={handleOnChange} />
                        </div>
                        <div className="passwordBox">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" placeholder="Enter Password" name="Password" value={Password} onChange={handleOnChange} />
                        </div>
                        <button className="button" type="submit">Log In</button>
                    </form>
                    <p className="loginParaPart">Don't have an account?<Link className="link" to="/Signup">Sign Up</Link></p>
                    <div className="orSection">
                        <div className="orLeftPart"></div>
                        <div className="orPart">OR</div>
                        <div className="orRightPart"></div>
                    </div>
                    <div className="guestSection" id="link" onClick={handleGuest}>
                        <i className="fa-solid fa-eye"></i>
                        <h1>Continue as Guest</h1>
                    </div>
                    <p className="guestInfo">Browse local vegetable prices without signing up.</p>
                </div>
            </div>
        </>
    );
}

export default Login;