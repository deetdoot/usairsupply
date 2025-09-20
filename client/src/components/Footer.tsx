import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-12 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">USAS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">United States Air Supply</h3>
                <p className="text-sm text-muted-foreground">Professional HVAC Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Providing professional HVAC installation, repair, and maintenance services for residential and commercial properties. Licensed, insured, and committed to your comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-home">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-products">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-services">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-quote">
                    Get Quote
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground" data-testid="text-phone">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground" data-testid="text-email">info@usairsupply.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground" data-testid="text-address">
                  123 HVAC Street<br />
                  City, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 United States Air Supply. All rights reserved. Licensed & Insured.
          </p>
        </div>
      </div>
    </footer>
  );
}