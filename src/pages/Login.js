import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import config from "../config";
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userActions';
import * as validator from "../utilities/validator";
import fullScreenPage from "../utilities/fullScreenPage";

// Page Login
//
// Formulaire de connexion

const Login = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    // Gestion des erreurs pour le formulaire grâce à validator.js(utilities)
    const handleErrors = () => {
        if(!validator.isValidEmail(email)){
            setError({
                source: "email",
                message: "Email invalide"
            });
            return false;
        }
        if(!validator.isValidPassword(password)){
            setError({
                source: "password",
                message: "Mot de passe invalide : minimum une Majuscule, une minuscule, un chiffre et un caractère spécial (#?!@$ %^&*-). longueur comprise entre 8 et 50"
            });
            return false;
        }
        setError(null);
        return true;
    }

    // Envoi du formulaire + gestion des erreurs de connexion
    const OnHandleSubmit = (e) => {
        e.preventDefault();
        
        if(!handleErrors()) return;

        const data = {
            email: email,
            password: password
        }
        
        axios.post(config.apiUrl + '/login', data)
        .then(response => {
            window.localStorage.setItem('TomBlog', response.data.token);
            setRedirect(true);
        }).catch(err => {
            if(err.response && err.response.status === 401) {
                setError({
                    source: "request",
                    message: "Utilisateur/Mot de passe invalide"
                })
            } else {
                setError({
                    source: "request",
                    message: "Un problème a eu lieu, Veuillez réessayer ultérieurement."
                })
            }
        })
    }

    // Gestion de l'affichage des champs en fonction des Erreurs
    useEffect(() => {
        
        fullScreenPage();
        
        if(props.user.isLogged) setRedirect(true);

        const errorArea = document.querySelector(".error-area");
        const fields = document.querySelectorAll(".login-field");
        fields.forEach(field =>{
            field.classList.remove('bad-input');
        })
        
        if(error){
            errorArea.classList.remove("invisible");
            if(error.source !== "request") {
                const errorInput = document.querySelector(`#${error.source}`);
                errorInput.classList.add("bad-input");
                errorInput.focus();
            }
            
        } else {
            errorArea.classList.add("invisible");
        }
        
    }, [error, props.user.isLogged])

    return(
        <div className="page login">
            {redirect && <Redirect to="/"/>}

            <h1>Se Connecter</h1>
            <form className="connection-wrapper sign-in" onSubmit={e => OnHandleSubmit(e)}>

                <label htmlFor="email">Email</label>
                <input 
                    className="login-field"
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    required
                />
                <label htmlFor="password">Mot de Passe</label>
                <input 
                    className="login-field"
                    type="password" 
                    name="password" 
                    id="password"
                    placeholder="votre mot de passe"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                    required
                />

                <div className="error-area">
                    <p className="error-message">{error && error.message}</p>
                </div>

                <input 
                    type="submit" 
                    value="Se Connecter"
                    
                />

                <Link to="/register">
                    <button>S'Enregistrer</button>
                </Link>
                
            </form>
        </div>
        
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {
    connectUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);