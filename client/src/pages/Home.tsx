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
import commercialImage from "@assets/generated_images/Commercial_HVAC_service_team_c3dbda7c.png";

export default function Home() {
  const stats = [
    { icon: Users, number: "5,000+", label: "Happy Customers" },
    { icon: Award, number: "20+", label: "Years Experience" },
    { icon: CheckCircle, number: "24/7", label: "Emergency Service" },
    { icon: Shield, number: "100%", label: "Licensed & Insured" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Dallas, TX",
      rating: 5,
      text: "Outstanding service! They installed our new AC system efficiently and the team was professional throughout the entire process.",
    },
    {
      name: "Mike Chen",
      location: "Houston, TX", 
      rating: 5,
      text: "Fast emergency repair when our heating went out in winter. Arrived within 2 hours and fixed everything. Highly recommend!",
    },
    {
      name: "Lisa Rodriguez",
      location: "Austin, TX",
      rating: 5,
      text: "Great maintenance service. They keep our commercial HVAC systems running smoothly and their prices are very competitive.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
                      <h3 className="font-semibold text-foreground">Licensed & Insured</h3>
                      <p className="text-muted-foreground">Fully licensed HVAC contractors with comprehensive insurance coverage for your peace of mind.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">20+ Years Experience</h3>
                      <p className="text-muted-foreground">Two decades of expertise in residential and commercial HVAC systems.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">24/7 Emergency Service</h3>
                      <p className="text-muted-foreground">Round-the-clock emergency repairs when you need them most.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Satisfaction Guarantee</h3>
                      <p className="text-muted-foreground">We stand behind our work with a 100% satisfaction guarantee.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={commercialImage} 
                  alt="Commercial HVAC service team working on rooftop equipment"
                  className="w-full h-auto rounded-lg shadow-xl"
                  data-testid="img-commercial-team"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Don't just take our word for it - hear from our satisfied customers
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for a free quote on your HVAC needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="secondary" data-testid="button-cta-quote">
                  Get Free Quote
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