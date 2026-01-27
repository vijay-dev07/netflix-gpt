export const checkValidData = (email , password , name ,isSignInForm ) => {

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/.test(password);

    if(!isEmailValid) return "Email ID Is not valid";
    if(!isPasswordValid) return "Password is not valid";
     if (!isSignInForm) {
    const isNameValid = name.trim().length > 0;
    if (!isNameValid) return "Please enter your name";
  }

    return null;

};