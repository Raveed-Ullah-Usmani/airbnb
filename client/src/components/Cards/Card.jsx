import React, { useState } from "react";
import "./Card.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Card = (props) => {
    const { card } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card-box"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={15}
                loop={true}
                pagination={isHovered ? { clickable: true } : false}
                modules={[Pagination, Navigation]}
                className="swiper-container"
                simulateTouch={true}
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
            <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black)" }}>
                <span style={{ fontWeight: "600" }}>${card.price}</span> night
            </p>
        </div>
    );
};

export default Card;
