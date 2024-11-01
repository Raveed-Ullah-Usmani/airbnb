import React, { useEffect, useState } from "react";
import { links } from "../../images-links";
import "./Categories.css";

const Categories = (props) => {
    const { selectedFilter, setSelectedFilter } = props;
    const [filterHeight, setFilterHeight] = useState(150); // Default height

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setFilterHeight(80);
            } else {
                setFilterHeight(150);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className="filter-div"
                style={{ top: `${filterHeight}px` }} // Dynamic height
            >
                {links.map((item, i) => (
                    <div
                        key={i}
                        className={`links-box ${i === selectedFilter && "selected-box"}`}
                        onClick={() => {
                            console.log("selecting key", i);
                            setSelectedFilter(i);
                        }}
                    >
                        <img src={item.imgSrc} className="links-img" />
                        <p
                            className={`links-label ${i === selectedFilter && "selected-label"}`}
                        >
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Categories;
