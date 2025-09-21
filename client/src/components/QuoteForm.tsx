import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteRequestSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Mail, MapPin, X, Package } from "lucide-react";
import { z } from "zod";
import type { Product } from "@shared/schema";

const quoteFormSchema = insertQuoteRequestSchema.extend({
  squareFootage: z.number().min(1, "Square footage is required").optional().or(z.literal("")),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;
type SelectedProduct = Pick<Product, 'id' | 'name' | 'brand' | 'model' | 'price' | 'category' | 'btu' | 'energyRating'>;

interface QuoteFormProps {
  onSubmit?: (data: QuoteFormValues) => void;
  selectedProducts?: SelectedProduct[];
  onRemoveProduct?: (productId: string) => void;
}

export default function QuoteForm({ onSubmit, selectedProducts = [], onRemoveProduct }: QuoteFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      equipmentType: "",
      buildingType: "",
      squareFootage: "",
      urgency: "",
      description: "",
      preferredContactTime: "",
    },
  });

  const handleSubmit = (data: QuoteFormValues) => {
    const submitData = {
      ...data,
      selectedProducts: selectedProducts
    };
    console.log("Quote form submitted:", submitData);
    setIsSubmitted(true);
    onSubmit?.(submitData);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground" data-testid="text-success-title">
              Quote Request Submitted!
            </h3>
            <p className="text-muted-foreground" data-testid="text-success-message">
              Thank you for your request. Our team will contact you within 24 hours to discuss your HVAC needs and provide a detailed quote.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">info@usairsupply.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm">24/7 Service</span>
              </div>
            </div>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              variant="outline"
              data-testid="button-submit-another"
            >
              Submit Another Request
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Get Your Free HVAC Quote</CardTitle>
        <CardDescription>
          Fill out the form below and our experts will provide you with a detailed quote within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Selected Products Section */}
        {selectedProducts.length > 0 && (
          <div className="space-y-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Selected Products</h3>
            </div>
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-background p-3 rounded border">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground" data-testid={`text-selected-product-${product.id}`}>
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{product.brand} • {product.model}</span>
                      {product.price && (
                        <span className="font-medium text-primary">
                          ${parseFloat(product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.btu && (
                        <Badge variant="outline" className="text-xs">
                          {product.btu.toLocaleString()} BTU
                        </Badge>
                      )}
                      {product.energyRating && (
                        <Badge variant="outline" className="text-xs">
                          {product.energyRating}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {onRemoveProduct && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveProduct(product.id)}
                      className="ml-2 h-8 w-8 p-0"
                      data-testid={`button-remove-product-${product.id}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              You can add more products to your quote by browsing our <a href="/products" className="text-primary hover:underline">product catalog</a>.
            </p>
          </div>
        )}
        
        {selectedProducts.length === 0 && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg text-center">
            <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No products selected yet. Browse our <a href="/products" className="text-primary hover:underline">product catalog</a> to add HVAC equipment to your quote.
            </p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, City, State 12345" {...field} data-testid="input-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Service Details</h3>
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger data-testid="select-service-type">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installation">New Installation</SelectItem>
                          <SelectItem value="repair">Repair Service</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="replacement">System Replacement</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger data-testid="select-equipment-type">
                          <SelectValue placeholder="Select equipment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="central-ac">Central Air Conditioning</SelectItem>
                          <SelectItem value="heat-pump">Heat Pump</SelectItem>
                          <SelectItem value="furnace">Furnace</SelectItem>
                          <SelectItem value="ductless">Ductless Mini-Split</SelectItem>
                          <SelectItem value="commercial">Commercial HVAC</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="buildingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Type *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger data-testid="select-building-type">
                            <SelectValue placeholder="Select building type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="squareFootage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Footage</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2000" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                          data-testid="input-square-footage"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Priority and Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Timeline & Contact Preferences</h3>
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency *</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="emergency" id="emergency" data-testid="radio-emergency" />
                          <Label htmlFor="emergency">Emergency (Same Day)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" data-testid="radio-urgent" />
                          <Label htmlFor="urgent">Urgent (1-3 Days)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" data-testid="radio-flexible" />
                          <Label htmlFor="flexible">Flexible (1-2 Weeks)</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredContactTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Time</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger data-testid="select-contact-time">
                          <SelectValue placeholder="Select preferred contact time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide any additional details about your HVAC needs, current issues, or specific requirements..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormDescription>
                    Include any specific issues, preferred brands, budget considerations, or other relevant information.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={form.formState.isSubmitting}
              data-testid="button-submit-quote"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Get Free Quote"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}