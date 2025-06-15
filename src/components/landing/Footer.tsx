import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Forex Trading Academy</h3>
            <p className=" font-light mb-4">
              Empowering traders with knowledge, tools, and support to succeed
              in the forex market.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white  hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className=" hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className=" hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className=" hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl  font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/courses" className=" hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/library" className=" hover:text-white">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/school" className=" hover:text-white">
                  Trading School
                </Link>
              </li>
              <li>
                <Link href="/ai-bot" className=" hover:text-white">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="font-light hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-light hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="font-light hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="font-light hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 font-light">
                <Mail className="w-5 h-5" />
                <span>support@forexacademy.com</span>
              </li>
              <li className="flex items-center gap-2 font-light">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" border-t-[0.1px] border-slate-400 mt-12 pt-8 text-center font-light">
          <p>
            &copy; {new Date().getFullYear()} Forex Trading Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
