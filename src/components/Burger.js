import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user/userActions";
import { switchDisplay } from "../actions/display/displayActions";

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
    const colors = {
        lightMode : {
            darker : "#a45c40",
            lighter : "#f6eee0",
            highlight : "#c38370"
        },
        darkMode : {
            darker : "#222124",
            lighter : "#2c2c2c",
            highlight : "#ffb331"
        }
    }
    
    // Ouverture/Fermeture du menu Burger
    useEffect(()=> {
        if(active){
            let header = document.querySelector(".header-wrapper");
            header.classList.add("no-scrolling");
            document.body.style.paddingTop = window.getComputedStyle(header).height;
            
            let clickCatcher = document.querySelector(".burger-menu");
            clickCatcher.style.width = window.innerWidth +"px";
            clickCatcher.style.height = (window.innerHeight + parseFloat(window.getComputedStyle(header).height))+"px";

            let burgerButton = document.querySelector(".burger-wrapper");
            
            clickCatcher.style.right = "-" + window.getComputedStyle(burgerButton).marginRight;
            

            window.addEventListener("click", e => onHandleClick(e))
        
            return () => {
                window.removeEventListener("click", e => onHandleClick(e))
            };
        }else {
            document.querySelector(".header-wrapper").classList.remove("no-scrolling");
            document.body.style.paddingTop = 0;
        }
    }, [active])

    // gestion des couleurs lightMode/darkMode
    useEffect(() => {
        let root = document.querySelector(':root');
        let switchElem = document.querySelector('.switcher');
        if(darkMode){
            root.style.setProperty('--grey', colors.darkMode.darker);
            root.style.setProperty('--lightgrey', colors.darkMode.lighter);
            root.style.setProperty('--orange', colors.darkMode.highlight);
            switchElem?.classList.remove('switch-light');
            switchElem?.classList.add('switch-dark');
        } else {
            root.style.setProperty('--grey', colors.lightMode.darker);
            root.style.setProperty('--lightgrey', colors.lightMode.lighter);
            root.style.setProperty('--orange', colors.lightMode.highlight);
            switchElem?.classList.remove('switch-dark');
            switchElem?.classList.add('switch-light');
        }
    }, [darkMode])

    // Gestion du click
    const onHandleClick = e => {
        e.stopPropagation();
        if(!e.target.classList.contains("burger-wrapper") && !e.target.classList.contains("burger-line")){
            setActive(false)
        }
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
        <div className="burger-wrapper" onClick={() => setActive(!active)}>
            <hr className="burger-line"/>
            <hr className="burger-line"/>
            <hr className="burger-line"/>
            {active && 

            <div className="burger-menu" >
                <nav onClick={e => e.stopPropagation()}>
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
            }
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