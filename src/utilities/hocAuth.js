import React from "react";
import axios from "axios";
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userActions';
import {Redirect} from 'react-router-dom';
import config from "../config";


// HOC d'Authentification
//
// Présent sur toutes les pages à l'exception de "No Service"
//
// Vérifie le statut de l'utilisateur ou son token d'Authentification
// Redirige l'utilisateur si la page est protégée (isAdmin = true)

export default function foo(ChildComponent, isAdmin = false) {
    class hocAuth extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                redirect : false
            }
        }

        componentDidMount() {
            
            // Cas Utilisateur déjà connecté
            if(this.props.user.isLogged){
                
                const role = this.props.user.infos.role;

                if(role === "admin") return;
                if(isAdmin) return this.setState({redirect: true});
                return;
            }
            
            const existingToken = window.localStorage.getItem('TomBlog');

            // Cas Utilisateur non connecté & sans token
            if(!existingToken){
                if(isAdmin){
                    return this.setState({redirect: true});
                }else{
                    return;
                }
                
            }
            // Cas Utilisateur non connecté & avec token
            axios.get(config.apiUrl + '/checkToken', {headers: {'x-access-token': existingToken}})
            .then(response => {
                if(response.status !== 200) return this.setState({redirect: true});
                if(isAdmin && response.data.user.role !== "admin") return this.setState({redirect: true});
                let user = response.data.user;
                user.token = existingToken;

                this.props.connectUser(response.data.user);
            }).catch(err => {
                this.setState({redirect: true});
            })

        }


        render() {
            if(this.state.redirect){
                return(
                    <Redirect to="/login"/>
                )
            }
            return(
                <ChildComponent {...this.props}/>
            )
        }

    }

    const mapStateToProps = (store) => {
        return {
            user: store.user
        }
    }

    const mapDispatchToProps = {
        connectUser
    }

    return connect(mapStateToProps, mapDispatchToProps)(hocAuth) ;
}