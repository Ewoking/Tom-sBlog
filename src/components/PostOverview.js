
// Composant Post Overview
//
// Utilisé dans plusieurs pages (Home/Search/Archives)
//
// Affiche un aperçu d'article (Titre, date, début du contenu)

const PostOverview = (props) => {
    
    // Formatte un texte en enlevant les retours à la ligne
    const contentManager = (text) => {
        const maxWords = 30;
        
        text = JSON.parse(text);
        return text.split(/\s|\n/).slice(0,maxWords).join(' ') + " ...";
    }

    // Formatte une date (string) au format local
    const dateManager = (dateString) => {
        return 'le ' + new Date(dateString).toLocaleDateString();
    }

    

    return(
        <div className="post-overview-wrapper">
            {props.post ?
            <article className="post-overview">
            <h2>{props.post.title}</h2>
            <p>{dateManager(props.post.creationTimestamp)}</p>
            <p>{contentManager(props.post.content)}</p>
        </article> :
        <article className="post-overview skeleton">
            <div className="skeleton-h2"></div>
            <div className="skeleton-date"></div>
            <div className="skeleton-abstract"></div>
            <div className="shimmer"></div>
        </article>}
        </div>
        
    )
}

export default PostOverview;