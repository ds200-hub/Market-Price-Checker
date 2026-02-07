import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css"
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { handleError, handleSuccess } from "../Utils/toatMessage";


function Signup() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        ShopName: "",
        Name: "",
        Email: "",
        Password: "",
    });
    const { ShopName, Name, Email, Password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(
                `${BASE_URL}/Signup`,
                { ...inputValue },
                { withCredentials: true },
            );
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
            console.log("status", error.response.data.success);
            console.log("message", error.response.data.message);
        }
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
                            <h1 className="loginH1">Sign Up</h1>
                        </div>
                        <div className="shopNameBox">
                            <i className="fa-solid fa-shop"></i>
                            <input type="text" name="ShopName" value={ShopName} placeholder="Shop Name" onChange={handleOnChange} />
                        </div>
                        <div className="nameBox">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="Name" value={Name} placeholder="Full Name" onChange={handleOnChange} />
                        </div>
                        <div className="emailBox">
                            <i className="fa-regular fa-envelope"></i>
                            <input type="text" name="Email" value={Email} placeholder="Enter Address" onChange={handleOnChange} />
                        </div>
                        <div className="passwordBox">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="Password" value={Password} placeholder="Password" onChange={handleOnChange} />
                        </div>
                        <button className="button" type="submit">Sign Up</button>
                    </form>
                    <p className="paraPart">Already have an account?<Link className="link" to="/Login" >Log In</Link></p>
                </div>
            </div>
        </>
    );
}

export default Signup;