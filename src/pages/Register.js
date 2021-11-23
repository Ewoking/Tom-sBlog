import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import config from "../config";
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userActions';
import * as validator from "../utilities/validator";
import fullScreenPage from "../utilities/fullScreenPage";

// Page Register
//
// Formulaire d'enregistrement utilisateur

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [redirect, setRedirect] = useState(false);
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
        if(!validator.isValidName(firstName)){
            setError({
                source: "firstName",
                message: "Le prénom n'accepte pas les chiffres ou caractères spéciaux. longueur comprise entre 2 et 20"
            });
            return false;
        }
        if(!validator.isValidName(lastName)){
            setError({
                source: "lastName",
                message: "Le nom n'accepte pas les chiffres ou caractères spéciaux. longueur comprise entre 2 et 20"
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

    // Gestion de l'affichage des champs en fonction des Erreurs
    useEffect(() => {

        fullScreenPage();
        
        if(props.user.isLogged) setRedirect(true);

        const errorArea = document.querySelector(".error-area");
        const fields = document.querySelectorAll(".register-field");
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

    // Envoi du formulaire + gestion des erreurs d'enregistrement
    const onHandleSubmit = (e) => {
        e.preventDefault();

        if(!handleErrors()) return;

        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }

        axios.post(config.apiUrl + '/register', data)
        .then(response => {
            setRedirect(true);

        }).catch(err => {
            if(err.response && err.response.status === 401) {
                setError({
                    source: "request",
                    message: "Email déjà utilisé"
                })
            } else {
                setError({
                    source: "request",
                    message: "Un problème a eu lieu, Veuillez réessayer ultérieurement."
                })
            }
        })
    }
    
    return(
        <div className="page register">
            {redirect && <Redirect to="/login"/>}
            
            <h1>S'Enregister</h1>
            <form className="connection-wrapper sign-up" onSubmit={e => onHandleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input 
                    className="register-field"
                    type="text" 
                    name="email" 
                    id="email"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    required
                />

                <label htmlFor="firstName">Prénom</label>
                <input 
                    className="register-field"
                    type="text" 
                    name="firstName" 
                    id="firstName"
                    placeholder="Jean"
                    value={firstName}
                    onChange={e => setFirstName(e.currentTarget.value)}
                    required
                />

                <label htmlFor="lastName">Nom</label>
                <input 
                    className="register-field"
                    type="text" 
                    name="lastName" 
                    id="lastName"
                    placeholder="Valjean"
                    value={lastName}
                    onChange={e => setLastName(e.currentTarget.value)}
                    required
                />

                <label htmlFor="password">Mot de Passe</label>
                <input
                    className="register-field"
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
                    value="S'Enregistrer"
                />

                <Link to="/login">
                    <button>Se Connecter</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(Register);