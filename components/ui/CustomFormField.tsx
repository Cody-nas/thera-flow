"use client";

import { E164Number } from "libphonenumber-js/core";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldtype } from "@/components/forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";

// Interface defining the properties expected for the custom form field component
interface CustomProps {
  control: Control<any>; // React Hook Form control object for handling form state
  fieldType: FormFieldtype; // Defines the type of input field (text, phone, etc.)
  name: string; // Name of the input field (used for form state management)
  label?: string; // Label text displayed for the input field
  placeholder?: string; // Optional placeholder text
  iconSrc?: string; // Optional icon source for the input field
  iconAlt?: string; // Alternative text for the icon
  disabled?: boolean; // Disables input field if true
  dateFormat?: string; // (Optional) Date format for date picker fields
  showTimeSelect?: boolean; // (Optional) Enables time selection for date picker fields
  defaultCountry?: string; // Default country code for phone input fields
  children?: React.ReactNode; // Optional child components
  renderSkeleton?: (field: any) => React.ReactNode;
}

/**
 * Renders the appropriate form field based on the specified `fieldType`
 */
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldtype.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""} // Ensures controlled input
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldtype.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldtype.CHECKBOX:
    case FormFieldtype.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined} // Ensures controlled component
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldtype.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="\assets\icons\calendar.svg"
            height={24}
            width={24}
            alt="calender"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldtype.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldtype.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      break;
  }
};

/**
 * CustomFormField Component
 * Wraps a form input field with necessary form handling logic using React Hook Form
 */
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name} // Uses dynamic field name for proper form state management
      render={({ field }) => (
        <FormItem className="flex-1">
          {/* Display label for fields except checkboxes */}
          {fieldType !== FormFieldtype.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          {/* Render appropriate input field */}
          <RenderField field={field} props={props} />

          {/* Display validation error message if any */}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
