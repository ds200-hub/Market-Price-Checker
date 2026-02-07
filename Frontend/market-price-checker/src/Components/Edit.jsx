import { useEffect, useState } from "react";
import "../Css/Edit.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../Utils/toatMessage";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function Edit() {
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({
        imageUrl: "",
        itemName: "",
        price: ""
    });
    const [newImage, setNewImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        const editData = async () => {
            try {
                const verifyRes = await axios.post(`${BASE_URL}/Verify`, {}, { withCredentials: true });
                const { status } = verifyRes.data;
                if (!status) {
                    navigate("/Login");
                }


                const { data } = await axios.get(`${BASE_URL}/marketItems/EditPrice/${id}`, { withCredentials: true });
                const { imageUrl, itemName, price } = data.data;
                setItemData({
                    ...itemData,
                    imageUrl: imageUrl,
                    itemName: itemName,
                    price: price
                });

            }
            catch (error) {
                console.log(error);
            }
        }
        editData();
    }, []);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value
        });
    }
    const handleOnNewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);

            const reader = new FileReader(); // file reader object create
            reader.onloadend = () => {
                setPreviewImage(reader.result); // base64 string
            };
            reader.readAsDataURL(file);
        }
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { price, itemName } = itemData;

        const formData = new FormData();
        formData.append("price", price);
        formData.append("itemName", itemName);
        if (newImage) {
            formData.append("image", newImage);
        }
        try {
            const priceRes = await axios.put(`${BASE_URL}/marketItems/EditPrice/item-price-update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const { success, message } = priceRes.data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/ShopkeeperWrapper");
                },1000);
            }
            else{
                handleError(message)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="editPage">
                <div className="editTopBar">
                    <h1>Edit Price</h1>
                </div>
                <div className="editPart">
                    <div className="editImagePart">
                        {
                            previewImage ?
                                (
                                    <img src={previewImage} alt="previewImage"></img>
                                )
                                :
                                (

                                    itemData.imageUrl ?
                                        (
                                            <img src={itemData.imageUrl} alt="vegetabe image" />
                                        )
                                        :
                                        (
                                            <div className="emptyImg">
                                                <p>Image</p>
                                            </div>
                                        )

                                )
                        }
                        <input className="item-Name" type="text" placeholder="Enter Item Name ..." name="itemName" value={itemData.itemName} onChange={handleOnChange} />
                    </div>
                    <div className="priceEditPart">
                        <form onSubmit={handleOnSubmit} className="form">
                            <h1>Current Price</h1>
                            <div className="editInputBox">
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                <input type="text" className="editInput" name="price" value={itemData.price} onChange={handleOnChange} />
                            </div>
                            <h1 className="uploadImage">Upload Image</h1>
                            <input type="file" className="fileUploadInput" name="image" onChange={handleOnNewImage} />
                            <button type="submit" className="editButton">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;