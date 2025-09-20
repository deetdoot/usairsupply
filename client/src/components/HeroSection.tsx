import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Award } from "lucide-react";
import heroImage from "@assets/generated_images/HVAC_technician_installing_AC_unit_89e864a4.png";

export default function HeroSection() {
  const features = [
    { icon: Shield, text: "Licensed & Insured" },
    { icon: Clock, text: "24/7 Emergency Service" },
    { icon: Award, text: "20+ Years Experience" },
    { icon: CheckCircle, text: "Satisfaction Guaranteed" },
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
              Professional HVAC Services You Can Trust
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert installation, repair, and maintenance for all your heating and cooling needs. 
              Serving residential and commercial properties with reliable, efficient solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/quote">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-hero-quote">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-foreground hover:bg-white/20" data-testid="button-hero-products">
                  Browse Products
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
                alt="Professional HVAC technician installing air conditioning unit"
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