import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Wrench, 
  Settings, 
  Snowflake, 
  Flame, 
  Shield, 
  Clock,
  ArrowRight 
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Settings,
      title: "HVAC Installation",
      description: "Professional installation of new heating and cooling systems with warranty and ongoing support.",
      features: ["New system design", "Professional installation", "System commissioning", "Warranty included"]
    },
    {
      icon: Wrench,
      title: "Repair & Maintenance",
      description: "Expert repair services and preventive maintenance to keep your HVAC system running efficiently.",
      features: ["Emergency repairs", "Preventive maintenance", "System tune-ups", "Parts replacement"]
    },
    {
      icon: Snowflake,
      title: "Air Conditioning",
      description: "Complete AC services including installation, repair, and maintenance for optimal cooling comfort.",
      features: ["AC installation", "Refrigerant service", "Duct cleaning", "Energy efficiency upgrades"]
    },
    {
      icon: Flame,
      title: "Heating Systems",
      description: "Comprehensive heating solutions from furnace installation to heat pump services and repairs.",
      features: ["Furnace installation", "Heat pump service", "Boiler maintenance", "Heating repairs"]
    },
    {
      icon: Shield,
      title: "Commercial HVAC",
      description: "Specialized commercial HVAC services for businesses, offices, and industrial facilities.",
      features: ["Commercial installation", "System design", "Maintenance contracts", "Emergency service"]
    },
    {
      icon: Clock,
      title: "Emergency Service",
      description: "24/7 emergency HVAC services when you need immediate assistance with your heating or cooling.",
      features: ["24/7 availability", "Rapid response", "Emergency repairs", "Holiday service"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Complete HVAC Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From installation to emergency repairs, we provide comprehensive HVAC solutions 
            for residential and commercial properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <ArrowRight className="h-4 w-4 text-primary mr-2" />
                      <span data-testid={`text-feature-${index}-${featureIndex}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/quote">
                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-service-quote-${index}`}>
                    Get Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" data-testid="button-view-all-services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}