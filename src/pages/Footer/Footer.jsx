import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
      
        <footer className="p-10 mt-24 bg-fuchsia-300 text-xl font-serif">

            <div className='footer '>
                <div className="grid grid-flow-col text-2xl ">
                    <FaFacebookF></FaFacebookF>
                    <FaTwitter></FaTwitter>
                    <FaYoutube></FaYoutube>
                </div>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </div>

            <div className='mt-9 justify-center text-xs'>
                <p className="font-bold">
                    <span className="text-pink-500">S</span>tory Weaver
                </p>
                <p className='font-semibold'>Reliable since 2019</p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>


        </footer>

    );
};

export default Footer;