import './index.css'
import {FaInstagram, FaTwitter, FaGoogle, FaYoutube} from 'react-icons/fa'

const IconsImage = () => (
  <div className="Footer-container">
    <div>
      <FaGoogle className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaYoutube className="footer-icon" />
    </div>
    <p className="Footer-heading">Contact us</p>
  </div>
)

export default IconsImage
