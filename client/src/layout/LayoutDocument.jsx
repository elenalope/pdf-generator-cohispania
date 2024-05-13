import { Outlet } from "react-router-dom";
import MyDocument from "../pages/document/MyDocument.jsx";

const LayoutDocument = () => { 
    return ( 
        <div>
            <MyDocument />
                <Outlet />
        </div>
    );
};

export default LayoutDocument;