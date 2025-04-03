"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";

// Enum defining different types of form fields
export enum FormFieldtype {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// ✅ 1. Define validation schema for form fields using Zod
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
});

const PatientForm = () => {
  // ✅ 2. Initialize the form with default values and validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "", // Ensures controlled input
      email: "", // Prevents undefined values
      phone: "", // Avoids uncontrolled behavior
    },
  });

  // ✅ 3. Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Log submitted form values
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {/* Section heading for the form */}
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        {/* ✅ 4. Input field for Full Name */}
        <CustomFormField
          fieldType={FormFieldtype.INPUT}
          control={form.control}
          name="username" // ✅ Matches schema
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* ✅ 5. Input field for Email */}
        <CustomFormField
          fieldType={FormFieldtype.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        {/* ✅ 6. Input field for Phone Number */}
        <CustomFormField
          fieldType={FormFieldtype.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(+234) 123-4567"
        />

        {/* Submit button for the form */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
