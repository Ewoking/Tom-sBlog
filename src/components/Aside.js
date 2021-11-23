import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faInstagramSquare, faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


// Composant Aside
//
// Utilisé dans les différentes pages
//
// Affiche le aside du site

const Aside = () => {
    return (
        <aside>
            <section className="networks-wrapper">
                <h4>Suivez-moi</h4>
                <ul>
                    <li><a href="https://twitter.com/keanuchreevess"><FontAwesomeIcon icon={faTwitter} className="twitter-logo"/></a></li>
                    <li><a href="https://www.instagram.com/keaanuureeves/"><FontAwesomeIcon icon={faInstagramSquare} className="instagram-logo"/></a></li>
                    <li><a href="https://www.facebook.com/keanu.revees.71216"><FontAwesomeIcon icon={faFacebookSquare} className="facebook-logo"/></a></li>
                </ul>
            </section>
            <section className="author-wrapper">
                <h4>L'Auteur</h4>
                <figure>
                    <Link to="/about">
                        <img src={'/images/thomasAnderson.jpg'} alt="Portrait de Thomas Anderson" />
                        <figcaption>Tom Anderson</figcaption>
                    </Link>
                </figure>
                
            </section>
        </aside>
        
    )
}

export default Aside;