import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <ul>
                        <li><a href="#Support">Support</a></li>
                        <li><a href="#Hosting">Hosting</a></li>
                        <li><a href="#Airbnb">About</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-socials">
                <a href="#" aria-label="Facebook">
                    <img src="path/to/facebook-icon.svg" alt="Facebook" />
                </a>
                <a href="#" aria-label="Twitter">
                    <img src="path/to/twitter-icon.svg" alt="Twitter" />
                </a>
                <a href="#" aria-label="Instagram">
                    <img src="path/to/instagram-icon.svg" alt="Instagram" />
                </a>
                <a href="#" aria-label="LinkedIn">
                    <img src="path/to/linkedin-icon.svg" alt="LinkedIn" />
                </a>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Airbnb Clone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
