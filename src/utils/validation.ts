export function validateEmail(email: string) {
  if (!email.trim()) {
    return 'Email is required';
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return 'Enter a valid email address';
  }

  return '';
}

export function validatePassword(password: string) {
  if (!password.trim()) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return '';
}


