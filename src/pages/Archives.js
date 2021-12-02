import {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import Aside from "../components/Aside";
import PostOverview from "../components/PostOverview";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import fullScreenPage from "../utilities/fullScreenPage";
import Skeleton from "../components/Skeleton";

const config = require('../config');
const axios = require("axios");

// Page Archives
//
// Recherche d'articles par date (mois + année)

const Archives = (props) => {

    const [resultArticles, setResultArticles] = useState([]);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(0);
    const [isSearching, setIsSearching] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0,0);
        fullScreenPage();
        // Récupération de la date du jour
        let date = new Date();

        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setMaxYear(date.getFullYear());

        // Requête serveur des article du mois
        axios.get(config.apiUrl + '/monthly?date=' + date.getFullYear() + '-' + date.getMonth())
        .then(response => {
            setResultArticles(response.data.posts);
            setIsSearching(false);
        }).catch(err => {
            if(err.response && err.response.status === 400) {
                history.push("/home");
            } else {
                history.push("/noService");
            }
        });

    }, [history])

    // Requête serveur des article du mois choisi par l'utilisateur
    const onHandleSubmit = (e) => {
        e.preventDefault();
        setIsSearching(true);
        
        axios.get(config.apiUrl + '/monthly?date=' + year + '-' + month)
        .then(response => {
            setResultArticles(response.data.posts);
            setIsSearching(false);
        }).catch(err => {
            if(err.response && err.response.status === 400) {
                history.push("/home");
            } else {
                history.push("/noService");
            }
        });
    }

    return(
        <div className="page archives">

            <h1>Recherche par mois</h1>
            <div className="date-bar-wrapper">
                <form className="date-bar" onSubmit={(e) => {onHandleSubmit(e)}}>
                        <select className="month-select" 
                        value={month}
                        onChange={e => setMonth(e.currentTarget.value)}>
                            <option value="00">Janvier</option>
                            <option value="01">Février</option>
                            <option value="02">Mars</option>
                            <option value="03">Avril</option>
                            <option value="04">Mai</option>
                            <option value="05">Juin</option>
                            <option value="06">Juillet</option>
                            <option value="07">Aout</option>
                            <option value="08">Septembre</option>
                            <option value="09">Octobre</option>
                            <option value="10">Novembre</option>
                            <option value="11">Décembre</option>
                            
                        </select>
                        <input className="year-input" 
                            type="number" 
                            min="1999" 
                            max={maxYear} 
                            step="1" 
                            value={year} 
                            onChange={e => setYear(e.currentTarget.value)}
                        />                        
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                        </button>
                    
                </form>
            </div>
            
            {props.darkMode ?
            <h3>Résultats du mois</h3> :
            <h3 className="dark-text">Résultats du mois</h3>
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
        darkMode: store.display.darkMode
    }
}

const mapDispatchToProps = {};
export default connect(mapStateToProps,mapDispatchToProps)(Archives);