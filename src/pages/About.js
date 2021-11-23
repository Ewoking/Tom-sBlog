import { useEffect } from "react";
import fullScreenPage from "../utilities/fullScreenPage";
import picture from '../assets/images/thomasAnderson.jpg'

// Page About
//
// Bio et Photo de l'auteur
const About = () => {
    
    useEffect(() => {
        window.scrollTo(0,0);
        fullScreenPage();
    }, []);
    
    return(
        <div className="page about">
            <div className="about-wrapper">
                <section className="description-wrapper">
                    <h2>Thomas Anderson</h2>
                    <p>Velit dignissim sodales ut eu sem integer vitae justo eget. Sed arcu non odio euismod lacinia at quis. Erat velit scelerisque in dictum non consectetur a erat. Sed libero enim sed faucibus turpis. Ultrices in iaculis nunc sed augue lacus. Urna nunc id cursus metus aliquam eleifend mi in. Sed felis eget velit aliquet sagittis id consectetur purus. Urna nec tincidunt praesent semper feugiat. Adipiscing tristique risus nec feugiat in. Ornare aenean euismod elementum nisi quis eleifend. Nec nam aliquam sem et tortor consequat id porta nibh. Sem viverra aliquet eget sit amet tellus. Dui ut ornare lectus sit amet est.</p>
                    <br/>
                    <p>Velit dignissim sodales ut eu sem integer vitae justo eget. Sed arcu non odio euismod lacinia at quis. Erat velit scelerisque in dictum non consectetur a erat. Sed libero enim sed faucibus turpis. Ultrices in iaculis nunc sed augue lacus. Urna nunc id cursus metus aliquam eleifend mi in. Sed felis eget velit aliquet sagittis id consectetur purus. Urna nec tincidunt praesent semper feugiat. Adipiscing tristique risus nec feugiat in. Ornare aenean euismod elementum nisi quis eleifend. Nec nam aliquam sem et tortor consequat id porta nibh. Sem viverra aliquet eget sit amet tellus. Dui ut ornare lectus sit amet est.</p>
                </section>
                {/* <img src="images/thomasAnderson.jpg" alt="Portrait de Tom Anderson" /> */}
                <img src={picture} alt="Portrait de Tom Anderson" />
            </div>
        </div>
    )
}

export default About;