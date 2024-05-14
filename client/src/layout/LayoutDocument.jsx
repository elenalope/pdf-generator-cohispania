import { Outlet } from "react-router-dom";
import MyDocument from "../pages/document/MyDocument.jsx";

const LayoutDocument = () => { 
    return ( 
        <div>
                <Outlet />
        </div>
    );
};

export default LayoutDocument;