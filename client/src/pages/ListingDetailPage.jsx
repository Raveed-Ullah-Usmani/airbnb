import Navbar from "../components/TestNavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useParams } from 'react-router-dom';
import ListingDetails from '../components/ListingDetails/ListingDetails';

const ListingDetailPage = () => {
    const { id } = useParams();
    return (
        <>
            <Navbar />
            <ListingDetails id={id} />
        </>
    );
};

export default ListingDetailPage;
