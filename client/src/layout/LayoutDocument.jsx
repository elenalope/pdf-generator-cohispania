import { Outlet } from "react-router-dom";
import Document from "../pages/document/Document.jsx";

const LayoutDocument = () => { 
    return ( 
        <div>
            <Document />
                <Outlet />
        </div>
    );
};

export default LayoutDocument;