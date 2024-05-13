import { Outlet } from "react-router-dom";
import Nav from "../components/navbar/Navbar";

const LayoutPublic = () => { 
    return ( 
        <div>
            <Nav />
                <Outlet />
        </div>
    );
};

export default LayoutPublic;