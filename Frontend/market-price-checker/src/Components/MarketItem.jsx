import { useContext, useEffect, useState } from "react";
import "../Css/MarketItem.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { roleContext } from "./ShopkeeperWrapper";
import { handleError, handleSuccess } from "../Utils/toatMessage";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function MarketItem({ search }) {
    const { arole } = useContext(roleContext);
    const navigate = useNavigate();
    const [marketItem, setMarketItem] = useState([]);

    useEffect(() => {

        const verifyCookie = async () => {
            try {

                if (arole == "shopkeeper") {

                    const { data } = await axios.post(`${BASE_URL}/Verify`, {}, { withCredentials: true });

                    const { status, message } = data;
                    if (!status) {
                        navigate("/Login");
                    }
                }
                const res = await axios.get(`${BASE_URL}/marketItems`, { withCredentials: true });
                setMarketItem(res.data.data);
            }
            catch (error) {
                console.error(error);
            }
        }

        verifyCookie();

    }, [arole]);

    const handleOnEdit = (item) => {
        navigate(`/marketItems/EditPrice/${item._id}`);
    }
    const handleOnDelete = async (item) => {
        try {
            const deleteRes = await axios.delete(`${BASE_URL}/marketItems/deleteItem/${item._id}`);
            const { success, message, id } = deleteRes.data;
            if (success) {
                handleSuccess(message);
                setMarketItem(
                    marketItem.filter((oldItem) => {
                        return oldItem._id !== id;
                    })
                );
            }
            else {
                handleError(message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const filterItem = marketItem.filter((item) => {
        return item.itemName.toLowerCase().includes((search || "").toLowerCase());
    })
    return (
        <>
            <div className="contentBody">
                
                {filterItem.length === 0 && (
                    <div className="warningDiv">
                        <p className="warningPara">Item Not Found</p>
                    </div>
                )}

                {filterItem.map((item) => (
                    <div className="itemCard" key={item._id}>
                        <div className="leftSectionCard">
                            <img src={item.imageUrl} loading="lazy" alt="tomato image" className="Img" />
                        </div>
                        <div className="centerSectionCard">
                            <h1 className="itemName">{item.itemName}</h1>
                            <p className="infoPart">Common</p>
                            <p className="infoPart">Updated 10 min ago</p>
                        </div>
                        <div className="rightSectionCard">
                            {
                                arole === "shopkeeper" ?
                                    (
                                        <div className="priceSectionShopkeeper">
                                            <p className="price"><b>₹{item.price}</b>/Kg</p>
                                            <i className="fa-solid fa-pen-to-square edit" onClick={() => handleOnEdit(item)}></i>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="priceSection">
                                            <p className="price"><b>₹{item.price}</b>/Kg</p>
                                        </div>
                                    )
                            }

                            <div className="iconSection">
                                {
                                    item.price >= item.previousPrice ?
                                        (
                                            <div className="iconBoxRed">
                                                <div className="leftIcon">
                                                    <i className="fa-solid fa-angle-up iconRed"></i>
                                                </div>
                                                <div className="rightIcon">
                                                    <i className="fa-solid fa-caret-up iconRed"></i>
                                                </div>
                                            </div>
                                        )

                                        :

                                        (
                                            <div className="iconBoxGreen">
                                                <div className="leftIcon">
                                                    <i className="fa-solid fa-angle-down iconGreen"></i>
                                                </div>
                                                <div className="rightIcon">
                                                    <i className="fa-solid fa-caret-down iconGreen"></i>
                                                </div>
                                            </div>
                                        )
                                }
                                <i className={`fa-solid fa-trash-can ${arole === "shopkeeper" ? "deleteIcon" : "hideDeleteIcon"}`}
                                    onClick={() => {
                                        if (arole === "shopkeeper") {
                                            handleOnDelete(item);
                                        }
                                    }
                                    }></i>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div>
        </>
    );
}

export default MarketItem;