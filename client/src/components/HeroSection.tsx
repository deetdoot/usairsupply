import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Award } from "lucide-react";
import heroImage from "@assets/USAS warehouse_1758503174620.png";
import usasLogo from "@assets/USAS logo transparent final (1)_1758501953578.png";
import semiTruck from "@assets/semi truck usas final_1758502681489.png";

export default function HeroSection() {
  const features = [
    { icon: Shield, text: "Certified Importers" },
    { icon: Clock, text: "Fast Bulk Delivery" },
    { icon: Award, text: "20+ Years Industry Experience" },
    { icon: CheckCircle, text: "Wholesale Pricing" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-accent/20 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex justify-center lg:justify-start mb-8">
              <img 
                src={usasLogo} 
                alt="United States Air Supply Logo"
                className="h-96 w-auto"
                data-testid="img-hero-logo"
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Bulk A/C Units for Your Business
            </h1>
            <p className="text-xl text-foreground/90 mb-8 font-medium">
              Direct importer and bulk supplier of commercial air conditioning units. 
              Serving contractors, distributors, and large-scale commercial projects with competitive wholesale pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/quote">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-hero-quote">
                  Request Wholesale Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="bg-white border-white text-black hover:bg-white/90 hover:text-black font-semibold" data-testid="button-hero-products">
                  View Inventory
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground" data-testid={`text-feature-${index}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={semiTruck} 
                  alt="USAS delivery truck with commercial AC equipment"
                  className="w-1/2 h-auto rounded-lg shadow-xl mx-auto"
                  data-testid="img-hero-truck"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="USAS warehouse with organized inventory and company branding"
                  className="w-full h-auto rounded-lg shadow-xl"
                  data-testid="img-hero-warehouse"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}