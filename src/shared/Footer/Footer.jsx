import React from "react";

// Logos
import GoogleLogo from "../../assets/images/google-play-store-icon-logo-symbol-free-png.webp";
import AppStoreLogo from "../../assets/images/App-Store-Logo.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 mt-10 ">
        <div className='w-full h-auto flex justify-evenly items-center !px-6'>

            <div id="center-section" className='max-w-[1200px] w-[1200px] mx-auto flex !py-1 flex-col'>
                <div className="max-w-7xl mx-auto !px-4 !py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* About Section */}
                    <div>
                    <h4 className="text-lg font-semibold mb-4">About OLX</h4>
                    <p className="text-sm">
                        OLX is a global online marketplace where you can buy and sell items locally. 
                        From electronics to furniture, OLX makes it easy to find what you need.
                    </p>
                    </div>

                    {/* Company Links */}
                    <div>
                    <h4 className="text-lg font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                        <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                    </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                    <h4 className="text-lg font-semibold mb-4">Help</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600">Support</a></li>
                        <li><a href="#" className="hover:text-blue-600">FAQs</a></li>
                        <li><a href="#" className="hover:text-blue-600">Safety Tips</a></li>
                        <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
                    </ul>
                    </div>

                </div>
            </div>
            
        </div>
        
        {/* Bottom Footer */}
        <div className="bg-gray-200 w-full flex justify-center !p-1">
                <div id="center-section" className="max-w-[1200px] w-full flex justify-between">
                    <div className="max-w-7xl mx-auto px-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
                        <p>© 2025 OLX. All Rights Reserved.</p>
                    </div>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Terms of Service</a>
                    </div>
                    
                </div>
        </div>
    </footer>
  );
};
