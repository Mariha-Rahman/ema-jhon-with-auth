import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../../UserContext/UserContext';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {user?.uid ?
                    <button onClick={logOut}>Log out</button>
                    :
                    <>
                        <Link to='/login'>Log In</Link>
                        <Link to='/signup'>Sign up</Link>
                    </>
                }
                <span className='headname'>{user?.email}</span>
            </div>
        </nav>
    );
};

export default Header;