import { links } from "../../images-links";
import "./Categories.css";

const Categories = (props) => {
    const { selectedFilter, setSelectedFilter } = props;
    return (
        <>
            <div className="filter-div">
                {links.map((item, i) => (
                    <div
                        key={i}
                        className={`links-box ${i == selectedFilter && "selected-box"}`}
                        onClick={() => {
                            console.log("selecting key", i);
                            setSelectedFilter(i);
                        }}
                    >
                        <img src={item.imgSrc} className="links-img" />
                        <p
                            className={`links-label ${i == selectedFilter && "selected-label"}`}
                        >
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Categories;
