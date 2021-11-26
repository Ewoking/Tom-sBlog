import PostOverview from "./PostOverview"

const Skeleton = (props) => {

    return (
        <div className="skeleton-wrapper">
            <PostOverview/>
            <PostOverview/>
            <PostOverview/>
            
        </div>
    )
}

export default Skeleton;