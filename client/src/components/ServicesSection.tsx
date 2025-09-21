import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Truck, 
  Package, 
  Building2, 
  Users, 
  Globe, 
  Zap,
  ArrowRight 
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Package,
      title: "Bulk Equipment Supply",
      description: "Large-scale commercial AC units imported directly from manufacturers for wholesale distribution.",
      features: ["Volume discounts", "Bulk inventory", "Multiple brands", "Commercial-grade units"]
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      description: "Efficient shipping and delivery solutions for large orders with reliable freight partnerships.",
      features: ["Freight coordination", "Scheduled deliveries", "Warehouse pickup", "Nationwide shipping"]
    },
    {
      icon: Building2,
      title: "Project Supply",
      description: "Complete equipment supply for large commercial projects, construction, and development.",
      features: ["Project consultation", "Specification matching", "Timeline coordination", "Volume pricing"]
    },
    {
      icon: Users,
      title: "Contractor Partnerships",
      description: "Dedicated support and competitive pricing for HVAC contractors and installation companies.",
      features: ["Contractor rates", "Credit terms", "Technical support", "Priority ordering"]
    },
    {
      icon: Globe,
      title: "Import & Distribution",
      description: "Direct import relationships with leading manufacturers ensuring quality and competitive pricing.",
      features: ["Factory direct", "Quality assurance", "Certification compliance", "Import documentation"]
    },
    {
      icon: Zap,
      title: "Fast Fulfillment",
      description: "Quick turnaround on orders with extensive warehouse inventory and expedited processing.",
      features: ["Same-day processing", "Express shipping", "Inventory alerts", "Order tracking"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Wholesale AC Distribution Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From bulk equipment supply to project fulfillment, we provide comprehensive wholesale solutions 
            for contractors, distributors, and commercial projects.
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
                    Request Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" data-testid="button-view-all-services">
              View Full Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}