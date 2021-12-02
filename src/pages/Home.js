import {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import Aside from "../components/Aside";
import PostOverview from "../components/PostOverview";
import Skeleton from "../components/Skeleton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import fullScreenPage from "../utilities/fullScreenPage";

const config = require('../config');
const axios = require("axios");

// Page Home
//
// Contient les cinq derniers Articles en date & une barre de recherche par mot-clé

const Home = (props) => {
    
    const [topArticles, setTopArticles] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching ] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0,0);
        fullScreenPage();
        // Requête serveur pour la page "Home" (5 derniers articles)
        axios.get(config.apiUrl + "/home")
        .then(response => {
            setTopArticles(response.data.posts);
        }).catch(err => {
            history.push("/noService");
        })
    }, [history])

    // Callback de recherche par mot-clé
    // (redirige vers la page "Search")
    const onHandleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
    }

    return(
        <div className="page home">

            {isSearching &&
            <Redirect to={{
                pathname: '/search',
                state: {query: searchInput}
            }}/>}

            

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
            
            <h1>Bienvenue sur le Blog de Tom</h1>
            {props.darkMode ?
            <h3>Les Derniers Articles</h3>:
            <h3 className="dark-text">Les Derniers Articles</h3>}

            <div className="main-wrapper">
                <div className="content-wrapper">
                {topArticles.length !== 0 ?
                    <section>
                        {topArticles.map((post,index) => {
                            return(
                                <Link to={`/post/${post.id}`} key={index}>
                                    <PostOverview  post={post}/>
                                </Link>
                                
                            )
                        })}
                    </section>
                    :
                    <Skeleton/>}
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

const mapDispatchToProps = {};
export default connect(mapStateToProps,mapDispatchToProps)(Home);