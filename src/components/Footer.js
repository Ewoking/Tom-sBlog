
// Composant Footer
//
// Utilisé dans App (tous les pages)
//
// Affiche le footer du site

const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <p>Site réalisé par Thomas Tenot</p>
                <figure>
                    <a href="https://3wa.fr/">
                        <img src={process.env.PUBLIC_URL + "/images/3WA-logo.gif"} alt="logo de la 3WA" />
                    </a>
                    <figcaption>Projet de fin de formation<br/>3WA</figcaption>
                </figure>
            </div>
            
        </footer>
    )
}

export default Footer;