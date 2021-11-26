import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import config from "../config";

const EditPost = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0,0);
        const postId = props.match.params.id;
        axios.get(config.apiUrl + "/post/" + postId)
        .then(response => {
            setTitle(response.data.post.title);
            setContent(JSON.parse(response.data.post.content));
        }).catch(err => {
            if(err.response && err.response.status === 404){
                history.push("/")
            } else {
                history.push("/noService")
            }
        })
    }, [props.match.params.id, history])

    const onHandleSubmit = e => {
        e.preventDefault();
        
        let data = {
            title: title,
            content: JSON.stringify(content)
        }
        axios.put(config.apiUrl + '/editPost/' + props.match.params.id, data, {headers: {"x-access-token": props.user.infos.token}})
        .then(response => {
            setRedirect(true);
        }).catch(err => {
            history.push("/noService")
        })
    }

    return (
        <div className="page new-post">
            {redirect && 
            <Redirect to="/"/>}

            <h1>Editer cet Article</h1>
            <form className="post-form" onSubmit={e => onHandleSubmit(e)}>
                <label htmlFor="title">Titre</label>
                <input 
                type="text" 
                name="title" 
                id="title"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
                required
                />

                <label htmlFor="contenu">Contenu de l'Article</label>
                <textarea
                name="content" 
                id="content"
                value={content}
                onChange={e => setContent(e.currentTarget.value)}
                rows="30"
                required/>
                
                <input type="submit" value="Editer l'article" />
            </form>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps,mapDispatchToProps)(EditPost);