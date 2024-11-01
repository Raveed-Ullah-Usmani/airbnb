
import "./Card.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Card = (props) => {
    const { card } = props;
    return (
        <div className="card-box">
            <Swiper style={{ zIndex: "-1" }}
                slidesPerView={1}
                spaceBetween={15}
                loop={true}
                mousewheel={true}
                cssMode={true}
                // pagination={{ clickable: true }}  // Making pagination clickable
                pagination
                modules={[Pagination, Navigation]}
                className="swiper-container"
                simulateTouch={true}  // Ensures touch gestures are enabled
            >
                {card.imgSrc.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img src={src} className="card-img" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="card-info-flex">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-rating">
                    <StarRateRoundedIcon />
                    <p>{card.rating}</p>
                </div>
            </div>
            <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.desc}</p>
            <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.date}</p>
            <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
                <span style={{ fontWeight: "600" }}>${card.price}</span> night
            </p>
        </div >
    );
}

export default Card;
