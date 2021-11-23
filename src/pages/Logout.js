import { useEffect} from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { logoutUser } from "../actions/user/userActions"

// Page Logout
//
// Déconnecte l'utilisateur et redirige vers la page "Home"

const Logout = (props) => {

    // Suppression du token d'Authentification & Update le state user de Redux
    useEffect(() => {
        window.localStorage.removeItem("TomBlog");
        props.logoutUser();
    }, [props])

    return(
        <div className="logout">
            {(!props.user.isLogged) && 
            <Redirect to="/" />}
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

export default connect(mapStateToProps,mapDispatchToProps)(Logout);