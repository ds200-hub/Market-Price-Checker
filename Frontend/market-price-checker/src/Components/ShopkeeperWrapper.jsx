import { useState, useEffect, createContext } from "react";
import MarketItem from "./MarketItem";
import Navbar from "./Navbar";

const roleContext = createContext();

function ShopkeeperWrapper() {
    const [search, setSearch] = useState("");
    const [arole, setarole] = useState("guest");

    useEffect(() => {
        setSearch(localStorage.getItem("itemName"));
    }, []);

    return (
        <>
            <roleContext.Provider value={{arole, setarole}}>
                <Navbar search={search} setSearch={setSearch} ></Navbar>
                <MarketItem search={search} ></MarketItem>
            </roleContext.Provider>
        </>
    );
}

export default ShopkeeperWrapper;
export {roleContext};