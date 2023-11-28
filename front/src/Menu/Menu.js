import './Menu.css';
import { Outlet } from "react-router-dom";

const Menu = () => {
    return <>
        <div className='menu'>
            <div style={{paddingLeft: '20px'}}>Hello</div>
            <div style={{paddingRight: '20px'}}>world</div>
        </div>

        <Outlet />
    </>
};

export default Menu;
