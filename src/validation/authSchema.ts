import * as Yup from 'yup';

const passwordRules = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: passwordRules,
});

export const signUpValidationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Enter your full name').required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
    .required('Phone number is required'),
  password: passwordRules,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});


