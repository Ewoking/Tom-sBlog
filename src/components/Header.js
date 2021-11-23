import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFeatherAlt} from '@fortawesome/free-solid-svg-icons';
import Burger from "./Burger"
import { Link } from 'react-router-dom';

// Composant Header
//
// Utilisé dans App (tous les pages)
//
// Affiche le header du site
const Header = () => {
    
    return(
        <header className="header-wrapper">
            <Link to="/">
                <div className="title-wrapper">
                    <FontAwesomeIcon icon={faFeatherAlt} className="feather-logo"/>
                    <h1>Tom's Blog</h1>
                </div>
            </Link>
            
            <Burger/>
            
            
        </header>
    )
}

export default Header;