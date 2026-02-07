import "../Css/Navbar.css"
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roleContext } from "./ShopkeeperWrapper";
import { handleSuccess } from "../Utils/toatMessage";

function Navbar({ search, setSearch }) {
    const [hamclass, setHamClass] = useState("btnsAndSearch");
    const navigate = useNavigate();
    const { arole, setarole } = useContext(roleContext);



    useEffect(() => {
        const verifyRole = async () => {
            const roleRes = await axios.post(`${BASE_URL}/verifyRole`, {}, { withCredentials: true });
            const { role } = roleRes.data;
            setarole(role);
        }

        verifyRole();
    }, [])

    const removeCookie = async () => {
        try {
            const logoutRes = await axios.post(`${BASE_URL}/Logout`, {}, { withCredentials: true });
            const { message } = logoutRes.data;
            handleSuccess(message);
            setTimeout(() => {
                navigate("/Login");
            }, 1000);
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        localStorage.setItem("itemName", value);
        setSearch(value);
    }
    const handleOnClick = () => {
        navigate("/marketItems/itemListing");
    }
    const handleHamburgerClick = () => {
        if (hamclass === "btnsAndSearch") {
            setHamClass("btnsAndSearch2");
        }
        else if (hamclass === "btnsAndSearch2") {
            setHamClass("btnsAndSearch");
        }

    }

    return (
        <>
            <div className="navbar">
                {
                    arole === "shopkeeper" ?

                        (<>
                            <div className="brandName">
                                <h1 className="name">Market Price Checker</h1>
                            </div>

                            <div className="ShopkeeperSearchSection" id="ShopkeeperSearchSection" >
                                <button className="addVege" onClick={handleOnClick}>
                                    <i className="fa-solid fa-circle-plus addIcon"></i>
                                    <h2 className="add">Add</h2>
                                </button>
                                <div className="searchOuter" >
                                    <i class="fa-solid fa-magnifying-glass searchLogo"></i>
                                    <input type="text" placeholder="Search Item..." className="searchInput" value={search} onChange={handleOnChange} />
                                </div>
                                <div className="logout">
                                    <button className="logoutbtn" onClick={removeCookie}>Logout</button>
                                </div>
                                <i className="fa-solid fa-bars hamburgerBtn" onClick={handleHamburgerClick}></i>
                            </div>
                        </>
                        )
                        :
                        (<>
                            <div className="box2">
                                <div className="brandName2">
                                    <h1 className="name2">Market Price Checker</h1>
                                </div>

                                <div className="searchSection2" >
                                    <div className="searchOuter2" >
                                        <i class="fa-solid fa-magnifying-glass searchLogo"></i>
                                        <input type="text" placeholder="Search Item..." className="searchInput" value={search} onChange={handleOnChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                }

                {arole === "shopkeeper" && (
                    <div className={hamclass}>
                        <div className="box">
                            <div className="searchOuterRes">
                                <i class="fa-solid fa-magnifying-glass searchLogo"></i>
                                <input type="text" placeholder="Search Item..." className="searchInput" value={search} onChange={handleOnChange} />
                            </div>
                            <div className="secondBox">
                                <button className="addVegeRes" onClick={handleOnClick}>
                                    <i className="fa-solid fa-circle-plus addIcon"></i>
                                    <h2 className="add">Add</h2>
                                </button>
                                <div className="logoutRes">
                                    <button className="logoutbtn" onClick={removeCookie}>Logout</button>
                                </div>
                            </div>
                        </div>
                        <div className="crossIcon">
                            <i className="fa-solid fa-xmark" onClick={handleHamburgerClick} ></i>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}

export default Navbar;