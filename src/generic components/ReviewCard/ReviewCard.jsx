import classes from "./reviewCard.module.css";


function ReviewCard(props) {
    return (
        <div className={classes.container}>
            <div className={classes.userImage}>
                <img src={props.userImg} alt="user" />
            </div>
            <div className={classes.userName}>
                <p>@{props.userName}</p>
            </div>
            <div className={classes.userReview}>
                <p>{props.userReview}</p>
            </div>
        </div>
    );
}


export default ReviewCard;