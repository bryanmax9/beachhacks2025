import "@/app/(landing)/_components/footer.css"; // Ensure CSS is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Floating Decorations */}

      {/* Links Section */}
      <div className="footer-links">
        <a href="#apply">Apply</a> • <a href="#sponsors">Sponsor Us</a>
      </div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
      </div>

      {/* Copyright Text */}
      <p className="footer-text">
        Made with 💙 and 🌊 by <span className="highlight">BeachHacks</span>
      </p>
    </footer>
  );
}
