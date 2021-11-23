import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user/userActions";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFeatherAlt} from '@fortawesome/free-solid-svg-icons';


// Composant Burger Menu
//
// Utilisé dans le Header
//
// Affiche au click le menu de navigation

const Burger = (props) => {
    const [active, setActive] = useState(false);
    const history = useHistory();
    
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
                </nav>
            </div>
            }
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}
const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Burger);