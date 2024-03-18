import { z } from "zod";

export const volunteerApplicationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(20, "Maximum 20 Characters")
    .regex(
      /^[a-zA-Z\s-.]*$/,
      "Invalid name, can only contain letters, spaces, hyphens, or periods."
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(20, "Maximum 20 Characters")
    .regex(
      /^[a-zA-Z\s-.]*$/,
      "Invalid name, can only contain letters, spaces, hyphens, or periods."
    ),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dob) => {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 100);
      return new Date(dob) >= maxDate;
    }, "Age must be less than 100 years old"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(40, "Maximum 20 Characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(20, "Maximum 20 Characters")
    .regex(/^[a-zA-Z\s]*$/, "City cannot contain numbers"),
  province: z
    .string()
    .min(2, "Province is required")
    .max(2, "Province must be 2 characters"),
  postalCode: z
    .string()
    .regex(
      /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/,
      "Invalid postal code. example: A1B 2C3"
    ),
  chapter: z.string().min(1, "Chapter is required"),
  primaryPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number. Example: 123-456-7890"
    ),
  secondaryPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number"
    )
    .or(z.string().length(0))
    .optional(),
  email: z.string().email("Invalid email address"),
  employer: z
    .string()
    .min(1, "Employer is required")
    .max(20, "Maximum 20 Characters"),
  conviction: z.string(),
  bondable: z.string(),
  medicalCondition: z.string(),
  medicalConditionDetails: z
    .string()
    .max(200, "Maximum 500 Characters")
    .optional(),
  emergencyContactName: z
    .string()
    .min(1, "Emergency contact name is required")
    .max(40, "Maximum 20 Characters")
    .regex(
      /^[a-zA-Z\s-.]*$/,
      "Invalid name, can only contain letters, spaces, hyphens, or periods."
    ),

  emergencyContactRelationship: z
    .string()
    .min(1, "Emergency contact relationship is required")
    .max(20, "Maximum 20 Characters")
    .regex(
      /^[a-zA-Z\s]*$/,
      "Invalid name, cannot contain numbers or special characters."
    ),
  emergencyContactPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number. Exmaple: 123-456-7890"
    ),
  volunteerExperienceDetails: z
    .string()
    .max(200, "Maximum 500 Characters")
    .optional(),
  agreedToTerms: z
    .boolean().refine((agreed) => agreed, "You must agree to the terms")
});
