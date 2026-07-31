import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  CircleCheckBig,
} from "lucide-react";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

import {
  inquirySchema,
  type InquiryFormValues,
} from "../validation/inquirySchema";

import { useCreateInquiry } from "../hooks/useInquiry";

export function ContactForm() {
  const createInquiry = useCreateInquiry();

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),

    defaultValues: {
      type: "general",
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const message = watch("message");

  function onSubmit(values: InquiryFormValues) {
    createInquiry.mutate(values, {
      onSuccess: () => {
        reset();
        setSubmitted(true);
      },
    });
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border bg-background p-10 shadow-sm lg:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CircleCheckBig
              size={40}
              className="text-green-600"
            />
          </div>

          <h2 className="text-3xl font-bold">
            Message Sent Successfully
          </h2>

          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Thank you for contacting BD Collection.
            Our team will get back to you within one business day.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        group
        space-y-10
        rounded-3xl
        border
        bg-background
        p-10
        shadow-sm
        transition-all
        duration-300
        hover:border-primary/20
        hover:shadow-xl
        lg:p-12
      "
    >
      {createInquiry.isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-700">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-red-600">
            Please try again later.
          </p>
        </div>
      )}

      {/* Header */}

      <div className="space-y-3">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-primary/10
            px-4
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-primary
          "
        >
          Contact Form
        </span>

        <h2 className="text-3xl font-bold tracking-tight">
          Send us a Message
        </h2>

        <p className="max-w-xl leading-7 text-muted-foreground">
          We'd love to hear from you.
          Our team usually replies within one business day.
        </p>
      </div>

      {/* Name + Email */}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
            Name
            <span className="text-destructive">*</span>
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Enter your full name"
              className="pl-11"
              disabled={createInquiry.isPending}
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-sm font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
            Email
            <span className="text-destructive">*</span>
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              type="email"
              placeholder="john@example.com"
              className="pl-11"
              disabled={createInquiry.isPending}
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
            Phone
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="+880 17XXXXXXXX"
              className="pl-11"
              disabled={createInquiry.isPending}
              {...register("phone")}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
            Subject
          </label>

          <div className="relative">
            <MessageSquare
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Enter a subject (optional)"
              className="pl-11"
              disabled={createInquiry.isPending}
              {...register("subject")}
            />
          </div>
        </div>
      </div>

      {/* Message */}

      <div>
        <label className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
          Message
          <span className="text-destructive">*</span>
        </label>

        <Textarea
          placeholder="Tell us how we can help you..."
          maxLength={1000}
          disabled={createInquiry.isPending}
          {...register("message")}
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Please provide as much detail as possible.
          </span>

          <span className="text-xs text-muted-foreground">
            {(message?.length ?? 0)} / 1000
          </span>
        </div>

        {errors.message && (
          <p className="mt-2 text-sm font-medium text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      {/* Privacy Note */}

      <p className="text-xs leading-6 text-muted-foreground">
        By submitting this form, you agree to be contacted regarding your
        inquiry. We respect your privacy and will never share your information
        with third parties.
      </p>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={createInquiry.isPending}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-primary
          font-semibold
          text-primary-foreground
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-lg
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        {createInquiry.isPending ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}