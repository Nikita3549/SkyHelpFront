
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  airline: string;
  flightnumber: string;
  date: Date;
  amount: string;
  paymentMethod: string;
  accountHolderName: string;
  paypalEmail: string;
  wiseAccountHolder: string;
  status?: 'pending' | 'in_progress' | 'escalated' | 'completed' | 'rejected';
  [key: string]: any;
};

export const validateClaimForm = (formState: FormState): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Basic validation
  if (!formState.firstName) errors.firstName = "First name is required";
  if (!formState.lastName) errors.lastName = "Last name is required";
  if (!formState.email) errors.email = "Email is required";
  if (!formState.airline) errors.airline = "Airline is required";
  if (!formState.flightnumber) errors.flightnumber = "Flight number is required";
  if (!formState.date) errors.date = "Date is required";
  if (!formState.amount) errors.amount = "Amount is required";
  
  // Payment method specific validation
  if (formState.paymentMethod === "bank_transfer") {
    if (!formState.accountHolderName) errors.accountHolderName = "Account holder name is required";
  } else if (formState.paymentMethod === "paypal") {
    if (!formState.paypalEmail) errors.paypalEmail = "PayPal email is required";
  } else if (formState.paymentMethod === "wise") {
    if (!formState.wiseAccountHolder) errors.wiseAccountHolder = "Account holder name is required";
  }
  
  return errors;
};
