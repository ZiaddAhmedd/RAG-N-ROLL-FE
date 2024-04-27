import classes from './InfiniteScrollingBanner.module.css';

export default function InfiniteScrollingBanner(props) {
    const { innerText, repeatNumber } = props;

    return (
        <div className={classes.bannerWrapper}>
            <div className={classes.scrollWrapper}>
                {[1, 2].map((item, index) => {
                    return (
                        <div className={classes.infiniteScrollingBanner} key={index}>
                            {
                                [...Array(repeatNumber ?? 6).keys()].map((item, index) => {
                                    return (
                                        <p key={index}>
                                            {innerText}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}