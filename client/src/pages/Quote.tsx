import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Shield, Award, CheckCircle } from "lucide-react";
import type { Product } from "@shared/schema";

type SelectedProduct = Pick<Product, 'id' | 'name' | 'brand' | 'model' | 'price' | 'category' | 'btu' | 'energyRating'>;

export default function Quote() {
  const [location] = useLocation();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  
  // Load selected products from localStorage
  useEffect(() => {
    const loadStoredProducts = () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
        setSelectedProducts(storedProducts);
        console.log('Loaded products from storage:', storedProducts.length);
      } catch (error) {
        console.error('Error loading stored products:', error);
        setSelectedProducts([]);
      }
    };

    loadStoredProducts();

    // Also check for URL parameters (backward compatibility)
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    
    if (productParam) {
      try {
        const productData: SelectedProduct = JSON.parse(decodeURIComponent(productParam));
        
        // Get current stored products
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
        const exists = storedProducts.some((p: any) => p.id === productData.id);
        
        if (!exists) {
          const updatedProducts = [...storedProducts, productData];
          localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
          setSelectedProducts(updatedProducts);
        }
      } catch (error) {
        console.error('Error parsing product data from URL:', error);
      }
    }
  }, [location]);

  const benefits = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed contractors with comprehensive insurance coverage"
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "We respond to all quote requests within 24 hours"
    },
    {
      icon: Award,
      title: "Expert Technicians",
      description: "20+ years of experience in HVAC installation and repair"
    },
    {
      icon: CheckCircle,
      title: "No Obligation",
      description: "Free, detailed quotes with no pressure to purchase"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Submit Request",
      description: "Fill out our detailed quote form with your HVAC needs"
    },
    {
      step: "2", 
      title: "Site Assessment",
      description: "Our expert technician visits your property for evaluation"
    },
    {
      step: "3",
      title: "Detailed Quote",
      description: "Receive a comprehensive quote with all costs and options"
    },
    {
      step: "4",
      title: "Installation",
      description: "Professional installation by our certified team"
    }
  ];

  const handleQuoteSubmit = (data: any) => {
    console.log('Quote request submitted:', data);
    console.log('Selected products:', selectedProducts);
    // In real app, this would send data to backend with selected products
  };

  const removeProduct = (productId: string) => {
    const updatedProducts = selectedProducts.filter(p => p.id !== productId);
    setSelectedProducts(updatedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
    console.log('Removed product from quote. Remaining products:', updatedProducts.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get Your Free HVAC Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional HVAC services tailored to your needs. No hidden fees, no surprises - 
              just honest, transparent pricing from licensed experts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">info@usairsupply.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">24/7 Emergency Service</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <QuoteForm 
                onSubmit={handleQuoteSubmit} 
                selectedProducts={selectedProducts}
                onRemoveProduct={removeProduct}
              />
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Why Choose Us?</CardTitle>
                  <CardDescription>
                    Experience the difference with United States Air Supply
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground" data-testid={`text-benefit-title-${index}`}>
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Our Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Our Process</CardTitle>
                  <CardDescription>
                    Simple steps to get your HVAC project completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground" data-testid={`text-step-title-${index}`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${index}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-destructive/10 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-xl text-destructive">Emergency Service</CardTitle>
                  <CardDescription>
                    Need immediate assistance? We're here 24/7
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For heating or cooling emergencies, call us immediately. Our emergency team is available around the clock.
                  </p>
                  <Button variant="destructive" className="w-full" data-testid="button-emergency-call">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Emergency Line
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@usairsupply.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 HVAC Street<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 7 AM - 8 PM<br />
                        Sat-Sun: 8 AM - 6 PM<br />
                        <span className="text-destructive font-medium">Emergency: 24/7</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}