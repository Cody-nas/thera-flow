export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.jpg",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.jpg",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.jpg",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.jpg",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.jpg",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.jpg",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.jpg",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.jpg",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.jpg",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
