import { useEffect, useState } from "react";
import { connect } from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faTimes, faFeatherAlt} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Aside from "../components/Aside";
import ArticleSkeleton from "../components/ArticleSkeleton";
import fullScreenPage from "../utilities/fullScreenPage";

const config = require('../config');
const axios = require("axios");

// Page Post Detail
//
// Article complet + section commentaires

const PostDetail = (props) => {

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const history = useHistory();

    // Formatte une date (string) au format local pour l'article
    const dateManager = (dateString, withTime=false) => {
        let date = new Date(dateString);
        let result = 'le ' + date.toLocaleDateString();
        return withTime ? result + ` à ${date.getHours()}h${date.getMinutes()}` : result ;
    }

    // Requête serveur de l'article + commentaires associés
    useEffect(() => {
        window.scrollTo(0,0);
        fullScreenPage();
        const postId = props.match.params.id;

        axios.get(config.apiUrl + "/post/" + postId)
        .then(response => {
                setPost(response.data.post);
                setComments(response.data.comments);
        }).catch(err => {
                if(err.response && err.response.status === 404){
                    history.push('/')
                } else {
                    history.push('/noService')
                }
                
            })
    }, [props.match.params.id, history])

    // Requête serveur d'ajout de commentaire
    const onHandleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: props.user.infos.id,
            postId: props.match.params.id,
            content: JSON.stringify(newComment)
        }
        axios.post(
            config.apiUrl + '/newComment',
            data,
            {headers: {"x-access-token": props.user.infos.token}}
        ).then(response => {
            window.location.reload(false);
        }).catch(err => {
            history.push('/noService')
        })
    }

    // Requête de suppression de l'article (admin)
    const onHandleDeletePost = (e, postId) => {
        e.preventDefault();

        if(window.confirm("Voulez-vous vraiment supprimer cet article ?")){
            axios.delete(
                config.apiUrl + '/deletePost/' + postId,
                {headers: {"x-access-token": props.user.infos.token}}
            ).then(response => {
                history.push('/');
            }).catch(err => {
                history.push('/noService')
            })
        }
    }

    // Redirection vers la page d'édition de l'article (admin)
    const onHandleEdit = (postId) => {
        history.push('/editPost/' + postId);
    }

    // Requête de suppression de commentaire (admin ou auteur du commentaire) 
    const onHandleDeleteComment = (e,commentId) => {
        e.preventDefault();

        if(window.confirm("Voulez-vous vraiment supprimer ce message ?")){
            axios.delete(
                config.apiUrl + '/deleteComment/' + commentId,
                {headers: {"x-access-token": props.user.infos.token}}
            ).then(response => {
                window.location.reload(false);
            }).catch(err => {
                history.push('/noService')
            })
        }  
    }

    
    return(
        <div className="page post-detail">

            <div className="main-wrapper">
                <div className="content-wrapper">
                {post ?
                <section className="post-wrapper">
                    <h1>{post.title}</h1>
                    {props.darkMode ?
                    <p>{dateManager(post.creationTimestamp)}</p> :
                    <p className="dark-text">{dateManager(post.creationTimestamp)}</p>
                    }
                    <div className="post-content">
                        {JSON.parse(post.content).split(/\n/).map((para,index) => {
                            return para !== '' ?
                                <p key={index}>{para}</p>:
                                <br key={index}/>
                            
                        })}
                    </div>
                    
                    {props.user.infos.role === "admin" &&
                        <div className="admin-options">
                            <button className="admin-button edit-button" onClick={e => {onHandleEdit(post.id)}}>
                                <FontAwesomeIcon icon={faFeatherAlt} className="admin-icon"/>
                            </button>
                            <button className="admin-button delete-button" onClick={e => {onHandleDeletePost(e, post.id)}}>
                                
                                <FontAwesomeIcon icon={faTimes} className="admin-icon"/>
                            </button>
                        </div>}
                </section>:
                <ArticleSkeleton/>}
                <section className="comment-section">
                    <h2>Commentaires</h2>
                    
                    {comments.length !== 0 ? 
                    comments.map(comment => {
                        
                        return(
                            <article key={comment.id} className="comment-wrapper">
                                <h3>{comment.firstName + " " + comment.lastName}</h3>
                                {comment.userId === props.user.infos.id &&
                                <FontAwesomeIcon icon={faUser} className="user-icon"/>}
                                <p>{dateManager(comment.creationTimestamp, true)}</p>
                                
                                <div className="comment-content">
                                    {JSON.parse(comment.content).split(/\n/).map((para,index) => {
                                        return para !== '' ?
                                            <p key={index}>{para}</p>:
                                            <br key={index}/>
                                        
                                    })}
                                </div>
                                {(comment.userId === props.user.infos.id || props.user.infos.role === "admin") &&
                                <button className="delete-button user-button" onClick={e => {onHandleDeleteComment(e, comment.id)}}>
                                    <FontAwesomeIcon icon={faTimes} className="admin-icon"/>
                                </button>}
                            </article>
                        )
                    }) :
                    <article className="no-result-wrapper">
                        {props.darkMode ?
                        <p>Aucun commentaire, soyez le premier à commenter !</p>:
                        <p className="dark-text">Aucun commentaire, soyez le premier à commenter !</p>}
                    </article>}

                    {props.user.isLogged ? 
                    <form className="add-comment-wrapper" onSubmit={e => {onHandleSubmit(e)}}>
                        <textarea 
                            placeholder = "Ajoutez votre commentaire"
                            value = {newComment}
                            onChange = {e => setNewComment(e.currentTarget.value)}
                            required/>
                        <input type="submit" value="Poster Commentaire" className="add-comment-btn"/>
                    </form> :
                    <Link to='/login'>
                        <button className="add-comment-btn">Connectez vous pour pouvoir commenter</button>
                    </Link>
                    }
                </section>
                </div>
                <Aside/>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        darkMode: store.display.darkMode
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);