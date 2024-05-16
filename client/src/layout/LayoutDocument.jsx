import { Outlet } from "react-router-dom";

const LayoutDocument = () => { 
    return ( 
        <div>
                <Outlet />
        </div>
    );
};

export default LayoutDocument;