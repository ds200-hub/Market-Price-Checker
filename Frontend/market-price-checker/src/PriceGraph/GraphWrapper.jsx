import LineChart from "./LineChart";
import "../Css/GraphWrapper.css";
import { replace, useNavigate } from "react-router-dom";

function GraphWrapper() {
    const navigate = useNavigate();
    return (
        <>  
            <div className="back-btn-box">
                <button className="back-btn" onClick={()=>{navigate("/ShopkeeperWrapper", {replace: true})}}>Back</button>
            </div>
            <div className="container">
                <div className="chartContainer">
                    <LineChart></LineChart>
                </div>
            </div>
        </>
    );
}

export default GraphWrapper;
