import React, { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for making HTTP requests
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Card = (props) => {
    const { card } = props;
    const [isHovered, setIsHovered] = useState(false);
    const maxLength = 20; // Set your desired character limit
    const truncatedDesc = card.desc.length > maxLength ? card.desc.substring(0, maxLength) + "..." : card.desc;
    const navigate = useNavigate();

    const handleCardClick = async () => {
        try {
            // Send a request to the backend with the card ID
            const response = await axios.get(`http://localhost:3000/api/listings/${card.id}`);
            if (response.data) {
                // If the response is successful, navigate to the listing details page
                navigate(`/listings/${card.id}`);
            }
        } catch (error) {
            console.error("Error fetching listing details:", error);
        }
    };

    return (
        <div
            className="card-box"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
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
            <p style={{ margin: 0, color: "var(--font-grey)" }}>{truncatedDesc}</p>
            <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.date}</p>
            <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black)" }}>
                <span style={{ fontWeight: "600" }}>${card.pricePerNight}</span> night
            </p>
        </div>
    );
};

export default Card;
