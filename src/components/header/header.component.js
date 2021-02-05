import React from 'react';
import './header.style.css'
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/4.2 crown.svg'
import {auth} from "../../firebase/firebase.utils";
import {connect} from 'react-redux'
import CartIcon from "../cart/cart-icon/cart-icon.component";
import CartDropDown from "../cart/cart-dropdown/cart-dropdown.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selector";

const Header = ({currentUser,hidden}) => {
    return (
        <div className={'header'}>
            <Link to={'/'}>
                <Logo className={'logo'}/>
            </Link>
            <div className={'options'}>
                <Link to={'/shop'} className={'option'}>SHOP</Link>
                <Link to={'/shop'} className={'option'}>CONTACT</Link>
                {
                    currentUser?
                        <div className={'option'} onClick={()=>auth.signOut()}>SIGN OUT </div>:
                        <Link to={'/signin'} className={'option'}>SIGN IN</Link>
                }
                <CartIcon/>

            </div>
            {hidden?null: <CartDropDown/>}
    </div>
    );
};

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStateToProps)(Header);
