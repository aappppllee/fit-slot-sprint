
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gym-soft-gray py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gym-purple rounded-md flex items-center justify-center">
                <span className="font-bold text-white text-xl">F</span>
              </div>
              <span className="font-bold text-xl">FitSlot</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Book your gym sessions with ease. Pay as you play.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gym-purple hover:text-gym-dark-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gym-purple hover:text-gym-dark-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gym-purple hover:text-gym-dark-purple transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-gym-purple transition-colors">Home</Link></li>
              <li><Link to="/book" className="text-gray-600 hover:text-gym-purple transition-colors">Book a Slot</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-gym-purple transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gym-purple transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gym-purple transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gym-purple transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">SCO 123, Sector 17</p>
            <p className="text-gray-600 mb-2">Chandigarh, 160017</p>
            <p className="text-gray-600 mb-2">Email: info@fitslot.com</p>
            <p className="text-gray-600">Phone: +91 98765 43210</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} FitSlot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
