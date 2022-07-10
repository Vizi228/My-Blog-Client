import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Email should be a valid email').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();