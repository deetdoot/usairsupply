import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Award, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Star
} from "lucide-react";
import warehouseImage from "@assets/USAS warehouse_1758503174620.png";
import semiTruckImage from "@assets/semi truck usas final_1758502681489.png";

export default function Home() {
  const stats = [
    { icon: Users, number: "1,000+", label: "Business Customers" },
    { icon: Award, number: "20+", label: "Years Importing" },
    { icon: CheckCircle, number: "50K+", label: "Units Distributed" },
    { icon: Shield, number: "100%", label: "Quality Assured" },
  ];

  const testimonials = [
    {
      name: "David Martinez",
      location: "ABC HVAC Contractors, Dallas TX",
      rating: 5,
      text: "Outstanding wholesale pricing and fast delivery! We've been ordering bulk units for our commercial projects and USAS consistently delivers quality equipment on time.",
    },
    {
      name: "Jennifer Wu",
      location: "Metro Construction Group, Houston TX", 
      rating: 5,
      text: "Reliable supplier for our large-scale commercial developments. They handle our project timelines perfectly and their bulk discounts save us significant costs.",
    },
    {
      name: "Robert Johnson",
      location: "Johnson Mechanical Services, Austin TX",
      rating: 5,
      text: "Excellent partner for our HVAC installation business. Their inventory is extensive and they understand contractor needs. Highly recommend for bulk purchasing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Truck Image at Top */}
      <div className="w-full">
        <img 
          src={semiTruckImage} 
          alt="USAS delivery truck with commercial AC equipment"
          className="w-full h-auto"
          data-testid="img-top-truck"
        />
      </div>
      
      {/* Warehouse Image Below Truck */}
      <div className="w-full">
        <img 
          src={warehouseImage} 
          alt="USAS warehouse with organized inventory and company branding"
          className="w-full h-auto"
          data-testid="img-top-warehouse"
        />
      </div>
      
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground" data-testid={`text-stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection />

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Why Choose United States Air Supply?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground">Direct Import Pricing</h3>
                      <p className="text-foreground/80">Factory-direct relationships with manufacturers ensure the most competitive wholesale pricing in the market.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground">20+ Years Import Experience</h3>
                      <p className="text-foreground/80">Two decades of expertise in commercial HVAC importing and distribution, serving businesses nationwide.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground">Fast Bulk Fulfillment</h3>
                      <p className="text-foreground/80">Extensive warehouse inventory and efficient logistics for rapid order fulfillment and delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground">Quality Assurance</h3>
                      <p className="text-foreground/80">All units undergo rigorous quality control and meet industry certifications and standards.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* Warehouse image removed - now at top of page */}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                What Our Business Partners Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Don't just take our word for it - hear from contractors and businesses we serve
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg" data-testid={`text-testimonial-name-${index}`}>
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-testimonial-location-${index}`}>
                          {testimonial.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" data-testid={`text-testimonial-text-${index}`}>
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Order Bulk AC Units?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for wholesale pricing and bulk order quotes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="secondary" data-testid="button-cta-quote">
                  Request Wholesale Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" data-testid="button-cta-call">
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}