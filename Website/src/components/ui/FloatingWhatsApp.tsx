import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './FloatingWhatsApp.css';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=919113602689&text=0&type=phone_number&app_absent=0';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="floating-whatsapp"
      id="floating-whatsapp-btn"
    >
      {/* Ripple / wave rings */}
      <span className="wa-wave wa-wave-1" />
      <span className="wa-wave wa-wave-2" />
      <span className="wa-wave wa-wave-3" />

      {/* Icon circle */}
      <span className="wa-icon-circle">
        <FontAwesomeIcon icon={faWhatsapp} />
      </span>
    </a>
  );
}
