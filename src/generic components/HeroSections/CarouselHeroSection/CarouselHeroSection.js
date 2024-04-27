import classes from "./CarouselHeroSection.module.css";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CarouselHeroSection(props) {

    const homeImages = [
        "https://img.freepik.com/free-photo/young-woman-business-suit-wearing-hat_1303-17698.jpg?w=360&t=st=1693778905~exp=1693779505~hmac=e0dad995b81b9095b8e223a44a62c80e0c72421d10ee6602f7c28c374ab75b54",
        "https://img.freepik.com/free-photo/surprised-lovely-girl-white-shoes-posing-purple-wall-during-indoor-photoshoot-full-length-portrait-interested-curly-woman-pink-pants-elegant-fur-jacket_197531-5106.jpg?w=1060&t=st=1693779173~exp=1693779773~hmac=940a2edb5c4c3aeeae1c338c77ace9eb32009e58c5c22cadf7a9037730ff5af2",
        "https://img.freepik.com/free-photo/fashionable-model-stylish-hat-red-coat-boots-posing-white-wall-studio_273443-4646.jpg?w=1060&t=st=1693779409~exp=1693780009~hmac=669122e3736edd1733ab236cb6d3c4922ac8663c7f41b41a710c74b644406fe5",
        "https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?w=360&t=st=1693857940~exp=1693858540~hmac=445470e06414df56754e9b162d4eb7ac7b16f66bf7f9d1c3286fc72f940f3464",
        "https://img.freepik.com/free-photo/inspired-female-model-midi-skirt-dancing-with-pleasure-pink-wall-caucasian-sensual-girl-trendy-blouse-having-fun_197531-5280.jpg?w=1060&t=st=1693779321~exp=1693779921~hmac=de85bff46bd51a3e3c011736046c58073307c207fc0f59bba11c637152b4e840",
        "https://img.freepik.com/free-photo/fashionable-woman-brown-coat-beige-hat-posing_273443-3771.jpg?w=1060&t=st=1693779167~exp=1693779767~hmac=c718141a95a09d11683ec5157131e9d28a04a53be3f185f20cc41f7f3769e187",
        "https://img.freepik.com/free-photo/summer-portrait-cheerful-red-haired-lady-fashionable-outfit-having-fun-pink_273443-4440.jpg?w=360&t=st=1693857866~exp=1693858466~hmac=47cee5352e4fa3d05fa60652cab10d1825bb4cb94120e22457c7967ca0f35479",
    ]
    function displayCarouselItems(images) {
        return homeImages.map((item, index) =>
            <img key={index} src={item} className={classes.carouselImage} alt="homeImage" />
        )
    }
    function renderDotsItem(e) {
        return <div className={`${e.isActive ? classes.active : ""} ${classes.carouselIndexBtn}`}></div>
    }

    function renderPrevButton(e) {
        return <ArrowBackIosNewIcon className={`${e.isDisabled ? classes.disabled : ""} : ${classes.carouselBtn} ${classes.leftBtn}`} />
    }
    function renderNextButton(e) {
        return <ArrowForwardIosIcon className={`${e.isDisabled ? classes.disabled : ""} : ${classes.carouselBtn} ${classes.rightBtn} `} />
    }
    return (
        <section className={classes.hero} style={{ "--carousel-tint": props.tintColor }}>
            <AliceCarousel
                autoPlay
                autoPlayInterval={3000}
                animationType="fadeout"
                infinite
                mouseTracking
                items={displayCarouselItems(props.images)}
                renderDotsItem={renderDotsItem}
                renderPrevButton={renderPrevButton}
                renderNextButton={renderNextButton}
            />
            <div className={classes.heroContent}>
                <h1 className={classes.heroTitle}> Fly to Connect</h1>
                <button className={classes.heroBtn}>Book Now</button>
            </div>
        </section>
    );
}