import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  /* [[ Username Regex explained ]]

  - The username length must range between 7 to 20 characters
  
  - The username is allowed to contain only underscores (_) 
    other than alphanumeric characters
  
    - The first character of the username must be an alphabetic 
    character, i.e., [a-z] or [A-Z]
  */
  username: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z0-9_]{7,20}$/, "Invalid username")
    .required("Username is required"),

  image: Yup.string().url(),

  admin: Yup.boolean()
});

export default userSchema;
