"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface InquiryFormProps {
  type?: "general" | "partnership" | "product";
  prefillProduct?: string;
}

const inquirySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(200, "Company must be at most 200 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(3, "Phone number is too short")
    .max(30, "Phone number is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
  partnershipType: z.string().trim().optional(),
  product: z.string().trim().optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function InquiryForm({
  type = "general",
  prefillProduct,
}: InquiryFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultValues = useMemo<InquiryFormValues>(
    () => ({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      partnershipType: type === "partnership" ? "" : undefined,
      product: type === "product" ? prefillProduct ?? "" : undefined,
    }),
    [type, prefillProduct],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setServerError(null);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      company: values.company,
      email: values.email,
      phone: values.phone,
      message: values.message,
      type,
      partnershipType: type === "partnership" ? values.partnershipType : undefined,
      product:
        type === "product" ? values.product ?? prefillProduct ?? "" : undefined,
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setServerError(
          data?.error ??
            "We were unable to submit your inquiry. Please try again shortly.",
        );
        return;
      }

      setIsSuccess(true);
      reset(defaultValues);
    } catch {
      setServerError(
        "We were unable to submit your inquiry due to a network error. Please try again.",
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-green-900">
          Inquiry submitted
        </h3>
        <p className="mx-auto max-w-prose text-green-800">
          Thank you for reaching out to Supracyn Pharma. Our corporate team will
          review your inquiry and get back to you shortly.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </Label>
          <Input
            id="firstName"
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
            placeholder="John"
            {...register("firstName")}
          />
          <span
            id="firstName-error"
            role="alert"
            aria-live="polite"
            className={errors.firstName ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.firstName?.message}
          </span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </Label>
          <Input
            id="lastName"
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
            placeholder="Doe"
            {...register("lastName")}
          />
          <span
            id="lastName-error"
            role="alert"
            aria-live="polite"
            className={errors.lastName ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.lastName?.message}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">
          Company / Institution Name{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </Label>
        <Input
          id="company"
          aria-invalid={!!errors.company}
          aria-describedby="company-error"
          placeholder="Your Organization Ltd."
          {...register("company")}
        />
        <span
          id="company-error"
          role="alert"
          aria-live="polite"
          className={errors.company ? "block text-sm text-red-600" : "sr-only"}
        >
          {errors.company?.message}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            Business Email{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </Label>
          <Input
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            placeholder="john@company.com"
            {...register("email")}
          />
          <span
            id="email-error"
            role="alert"
            aria-live="polite"
            className={errors.email ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.email?.message}
          </span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </Label>
          <Input
            id="phone"
            type="tel"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
          <span
            id="phone-error"
            role="alert"
            aria-live="polite"
            className={errors.phone ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.phone?.message}
          </span>
        </div>
      </div>
      
      {type === "partnership" && (
        <div className="space-y-2">
          <Label htmlFor="partnershipType">Partnership Interest</Label>
          <select 
            id="partnershipType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.partnershipType}
            aria-describedby="partnershipType-error"
            {...register("partnershipType")}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="distributor">Distributor / Wholesaler</option>
            <option value="pharmacy">Pharmacy Chain</option>
            <option value="hospital">Hospital / Institutional Buyer</option>
            <option value="manufacturing">Third-party Manufacturing</option>
            <option value="privateLabel">Private Labeling</option>
          </select>
          <span
            id="partnershipType-error"
            role="alert"
            aria-live="polite"
            className={errors.partnershipType ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.partnershipType?.message}
          </span>
        </div>
      )}

      {type === "product" && (
        <div className="space-y-2">
          <Label htmlFor="product">Product of Interest</Label>
          <Input
            id="product"
            aria-invalid={!!errors.product}
            aria-describedby="product-error"
            defaultValue={prefillProduct}
            placeholder="Product name or generic composition"
            {...register("product")}
          />
          <span
            id="product-error"
            role="alert"
            aria-live="polite"
            className={errors.product ? "block text-sm text-red-600" : "sr-only"}
          >
            {errors.product?.message}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">
          Message / Details{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </Label>
        <Textarea 
          id="message" 
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
          placeholder="Please describe your business requirements..." 
          className="min-h-[120px]"
          {...register("message")}
        />
        <span
          id="message-error"
          role="alert"
          aria-live="polite"
          className={errors.message ? "block text-sm text-red-600" : "sr-only"}
        >
          {errors.message?.message}
        </span>
      </div>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          aria-live="polite"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" aria-hidden="true" />
          <div className="text-sm">{serverError}</div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        Submit Inquiry
      </Button>
      
      <p className="text-xs text-slate-500 mt-4">
        By submitting this form, you agree to our Privacy Policy. Your data will only be used for business correspondence by Supracyn Pharma.
      </p>
    </form>
  );
}
