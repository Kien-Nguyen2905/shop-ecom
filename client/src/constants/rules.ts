export const RULES: Record<string, {}> = {
  email: {
    required: { value: true, message: 'Please enter your email address' },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Invalid email',
    },
  },
  password: {
    required: { value: true, message: 'Please enter your password' },
    pattern: {
      value: /^.{6,}$/,
      message: 'Password must be 6 characters or more',
    },
  },
  agree: {
    required: {
      value: true,
      message: 'You must agree with the policy',
    },
  },
  street_address: {
    required: { value: true, message: 'Please enter street address' },
  },
  name: {
    required: { value: true, message: 'Please enter your name' },
  },
  full_name: {
    required: { value: true, message: 'Please enter your full name' },
  },
  confirm_password: {
    required: { value: true, message: 'Please enter your confirm password' },
  },
  firstName: {
    required: { value: true, message: 'Please enter your name' },
  },
  fullName: {
    required: { value: true, message: 'Please enter your name' },
  },
  birthday: {
    required: { value: true, message: 'Please enter your birthday' },
  },
  phone: {
    required: { value: true, message: 'Please enter your phone' },
    pattern: {
      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      message: 'Invalid phone',
    },
  },
  subject: {
    required: { value: true, message: 'Please enter subject' },
  },
  message: {
    required: { value: true, message: 'Please type message to our' },
  },
  date: {
    required: { value: true, message: 'Please enter your birthday' },
  },
  title: {
    required: { value: true, message: 'Please enter title' },
  },
  description: {
    required: { value: true, message: 'Please enter description' },
  },
  street: {
    required: { value: true, message: 'Please enter address' },
  },
  province: {
    required: { value: true, message: 'Please choose province/city' },
  },
  district: {
    required: { value: true, message: 'Please choose district/town' },
  },
  ward: {
    required: { value: true, message: 'Please choose ward' },
  },
};
