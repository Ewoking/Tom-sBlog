import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user/userActions";
import { switchDisplay } from "../actions/display/displayActions";
import colorTheme from '../utilities/colorTheme';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFeatherAlt, faSun, faMoon} from '@fortawesome/free-solid-svg-icons';


// Composant Burger Menu
//
// Utilisé dans le Header
//
// Affiche au click le menu de navigation

const Burger = (props) => {
    const [active, setActive] = useState(false);
    const [darkMode, setDarkMode] = useState(props.darkMode);
    const history = useHistory();
    
    
    // Ouverture/Fermeture du menu Burger
    useEffect(()=> {
        if(active){
            let header = document.querySelector(".header-wrapper");
            let clickCatcher = document.querySelector(".burger-menu");
            let burgerButton = document.querySelector(".burger-wrapper");

            //header in fixed position & resizing body accordingly
            header.classList.add("no-scrolling");
            document.body.style.paddingTop = window.getComputedStyle(header).height;
            
            // positioning clickcatcher all across the page 
            clickCatcher.style.width = window.innerWidth +"px";
            clickCatcher.style.height = (window.innerHeight - parseFloat(window.getComputedStyle(header).height))+"px";
            clickCatcher.style.right = "-" + window.getComputedStyle(burgerButton).marginRight;

            document.querySelector(".burger-menu nav").classList.remove('rolling');

            window.addEventListener("click", e => onHandleClick(e))
        
            return () => {
                window.removeEventListener("click", e => onHandleClick(e))
            };
        }else {
            document.querySelector(".burger-menu").style.height = 0;
            document.querySelector(".burger-menu nav").classList.add('rolling');
            document.querySelector(".header-wrapper").classList.remove("no-scrolling");
            document.body.style.paddingTop = 0;
            
        }
    }, [active])

    // gestion des couleurs lightMode/darkMode
    useEffect(() => {
        if(darkMode) colorTheme.switchColorTheme(true);
        else colorTheme.switchColorTheme(false);
    }, [darkMode])

    // Gestion du click
    const onHandleClick = e => {
        e.stopPropagation();
        if(!e.target.classList.contains("burger-wrapper") && !e.target.classList.contains("burger-line")){
            setActive(false)
        }
    }

    const globalClick = e => {
        if(!active && e.target.classList.contains('burger-menu')) return;
        setActive(!active);
    }

    // Gestion du bouton de création d'un article (admin)
    const onHandleNewArticle = () => {
        history.push('/newPost');
        setActive(false);
    }

    const onHandleSwitch = (e) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
        props.switchDisplay();
    }

    return(
        <div className="burger-wrapper" onClick={globalClick}>
            <hr className="burger-line"/>
            <hr className="burger-line"/>
            <hr className="burger-line"/>
            
            <div className="burger-menu" >
                <nav onClick={e => {e.stopPropagation()}}>
                    {props.user.isLogged &&
                    <h2>{props.user.infos.firstName + " " + props.user.infos.lastName}</h2>
                    }
                    {props.user.isLogged && props.user.infos.role === "admin" &&
                    <div className="new-article-btn-wrapper">
                        <button className="new-article-btn" onClick={onHandleNewArticle}>
                            <p>Créer un nouvel Article</p>
                            <FontAwesomeIcon icon={faFeatherAlt} className="btn-feather-logo"/>
                        </button>
                    </div>}
                    <ul>
                        <li><Link to="/" onClick={()=>setActive(false)}>Accueil</Link></li>
                        <li><Link to="/about" onClick={()=>setActive(false)}>L'auteur</Link></li>
                        <li><Link to="/archives" onClick={()=>setActive(false)}>Archives</Link></li>
                    </ul>

                    {props.user.isLogged ?
                    <Link to="/logout" onClick={()=>setActive(false)}>Déconnexion</Link> :
                    <Link to="/login" onClick={()=>setActive(false)}>Connexion</Link>
                    }

                    <div className="color-switch" onClick={onHandleSwitch}>
                        <div className="switch-wrapper">
                            <FontAwesomeIcon icon={faSun} className="switch-icon sun"/>
                            <FontAwesomeIcon icon={faMoon} className="switch-icon moon" />
                            {props && props.darkMode ?
                            <div className="switcher switch-dark"></div> :
                            <div className="switcher switch-light"></div>}
                            
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        darkMode: store.display.darkMode
    }
}
const mapDispatchToProps = {
    logoutUser,
    switchDisplay
}

export default connect(mapStateToProps,mapDispatchToProps)(Burger);