import fullScreenPage from "../utilities/fullScreenPage";
import {useEffect} from 'react';

// Page No Service
//
// Message d'indisponibilité du service (server down)

const NoService = () => {
    
    useEffect(()=> {
        fullScreenPage();
    }, [])

    return (
        <div className="page no-service">
            <h1>Connexion perdue</h1>
            <p>Le blog est temporairement inaccessible, veuillez réessayer ultérieurement.</p>
        </div>
    )
}

export default NoService;