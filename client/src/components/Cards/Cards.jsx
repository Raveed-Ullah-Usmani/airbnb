import Card from "./Card";
import "./Card.css";
function Cards(props) {
    const { list } = props;
    return (
        <div className="cards-flex">
            {list.map((card, i) => (
                <Card card={card} key={i} />
            ))}
        </div>
    );
}

export default Cards;