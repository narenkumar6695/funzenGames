export interface FormData {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
}

export interface FormMessage {
  type: "success" | "error";
  message: string;
}

export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface LoginFormErrors {
  identifier?: string;
  password?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}
