import {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Aside from "../components/Aside";
import PostOverview from "../components/PostOverview";
import Skeleton from '../components/Skeleton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import fullScreenPage from "../utilities/fullScreenPage";

const config = require('../config');
const axios = require("axios");

// Page Search
//
// Recherche libre d'articles (match sur le titre de l'article)

const Search = (props) => {

    const [resultArticles, setResultArticles] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [commitedSearch, setCommitedSearch] = useState("");
    const [isSearching, setIsSearching] = useState(true);
    const history = useHistory();

    // Réceptionne une éventuelle query depuis la page "Home"
    // & effectue la requête serveur
    useEffect(()=>{
        window.scrollTo(0,0);
        fullScreenPage();
        
        if(!props.location.state) return setIsSearching(false);

        let existingQuery = "query" in props.location.state && props.location.state.query;
        if(!existingQuery) return setIsSearching(false);
        
        setSearchInput(existingQuery);
        setCommitedSearch(existingQuery);
        
        axios.get(config.apiUrl + "/search?q=" + existingQuery)
        .then(response => {
            setResultArticles(response.data.posts);
            setIsSearching(false);
        }).catch(err => {
            history.push('/noService');
        })
    }, [props.location.state, history])

    // Requête serveur d'une recherche utilisateur
    const onHandleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        setCommitedSearch(searchInput);

        axios.get(config.apiUrl + '/search?q=' + searchInput)
        .then(response => {
            setResultArticles(response.data.posts);
            setIsSearching(false);
        })
    }

    return(
        <div className="page search">
            <h1>Recherche</h1>
            
            <div className="search-bar-wrapper">
                <form className="search-bar" onSubmit={(e) => {onHandleSearch(e)}}>
                    <input 
                        type="text" 
                        placeholder="Recherchez un article"
                        value={searchInput}
                        onChange={e => {setSearchInput(e.currentTarget.value)}}
                        required/>
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                        </button>
                    
                </form>
            </div>
            
            {props.darkMode ?
            <h3>Résultats pour : "{commitedSearch}"</h3> :
            <h3 className="dark-text">Résultats pour : "{commitedSearch}"</h3>
            }

            <div className="main-wrapper">
                <div className="content-wrapper">
                    {isSearching ? 
                    <Skeleton/>:
                    <div className="results">
                        {resultArticles.length !== 0 ?
                        <section>
                            {resultArticles.map((post,index) => {
                                return(
                                    <Link to={`/post/${post.id}`} key={index}>
                                        <PostOverview  post={post}/>
                                    </Link>
                                    
                                )
                            })}

                        </section> :
                        <section className="no-result-wrapper">
                            {props.darkMode ?
                            <p>Pas de résultats ...</p> :
                            <p className="dark-text">Pas de résultats ...</p>
                            }
                        </section>}
                    </div>}
                </div>
                <Aside/>
            </div>
        </div>
    )
}
const mapStateToProps = (store) => {
    return {
        darkMode : store.display.darkMode
    }
}

const mapDispatchToProps = {};
export default connect(mapStateToProps,mapDispatchToProps)(Search);