"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InquiryFormProps {
  type?: "general" | "partnership" | "product";
  prefillProduct?: string;
}

export function InquiryForm({ type = "general", prefillProduct }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-100">
        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Inquiry Submitted</h3>
        <p className="text-green-800">
          Thank you for reaching out to Supracyn Pharma. Our corporate team will review your inquiry and get back to you shortly.
        </p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" required placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" required placeholder="Doe" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">Company / Institution Name</Label>
        <Input id="company" required placeholder="Your Organization Ltd." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input id="email" type="email" required placeholder="john@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      
      {type === "partnership" && (
        <div className="space-y-2">
          <Label htmlFor="partnershipType">Partnership Interest</Label>
          <select 
            id="partnershipType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="" disabled selected>Select an option</option>
            <option value="distributor">Distributor / Wholesaler</option>
            <option value="pharmacy">Pharmacy Chain</option>
            <option value="hospital">Hospital / Institutional Buyer</option>
            <option value="manufacturing">Third-party Manufacturing</option>
            <option value="privateLabel">Private Labeling</option>
          </select>
        </div>
      )}

      {type === "product" && (
        <div className="space-y-2">
          <Label htmlFor="product">Product of Interest</Label>
          <Input id="product" defaultValue={prefillProduct} required placeholder="Product name or generic composition" />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message / Details</Label>
        <Textarea 
          id="message" 
          required 
          placeholder="Please describe your business requirements..." 
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </Button>
      
      <p className="text-xs text-slate-500 mt-4">
        By submitting this form, you agree to our Privacy Policy. Your data will only be used for business correspondence by Supracyn Pharma.
      </p>
    </form>
  );
}
