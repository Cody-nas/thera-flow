"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

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

const PatientForm = () => {
  const router = useRouter(); // Router for navigation
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  // ✅ 2. Initialize the form with default values and validation
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "", // Ensures controlled input
      email: "", // Prevents undefined values
      phone: "", // Avoids uncontrolled behavior
    },
  });

  // ✅ 3. Handle form submission
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);
      // if (user) router.push(`/patient/${user.id}/register`);
    } catch (error) {
      console.log(error);
    }
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
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
