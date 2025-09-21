import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Award } from "lucide-react";
import heroImage from "@assets/generated_images/Industrial_HVAC_warehouse_inventory_d0a55365.png";

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
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Bulk A/C Units for Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
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
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-foreground hover:bg-white/20" data-testid="button-hero-products">
                  View Inventory
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground" data-testid={`text-feature-${index}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Industrial warehouse with bulk inventory of commercial AC units"
                className="w-full h-auto rounded-lg shadow-xl"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}