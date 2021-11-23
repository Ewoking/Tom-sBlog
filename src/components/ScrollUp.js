import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';


// Composant Scroll Up
//
// Utilisé dans App (toutes les pages)
//
// Affiche une flèche permettant de remonter en haut de page au clic
// (S'affiche seulement à partir d'une certaine hauteur)

const ScrollUp = () => {
    const [scroll, setScroll] = useState(0);

    // Affichage de la flèche en fonction de la hauteur sur la page
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        if(scroll < 200){
            document.querySelector(".scroll-up-wrapper").style.display = 'none';
        }else {
            document.querySelector(".scroll-up-wrapper").style.display = 'flex';
        }

        return () => {window.removeEventListener('scroll', handleScroll)}
    }, [scroll])

    // Callback de l'événement "scroll"
    const handleScroll = () => {
        setScroll(window.scrollY);
    }

    // Scroll en haut de page au clic
    const handleClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return(
        <div className="scroll-up-wrapper" onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronUp} className="arrow-up"/>
        </div>
    )
}

export default ScrollUp;