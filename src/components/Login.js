import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utls/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utls/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utls/userSlice";

 const Login = () => {
  const [isSignInForm , setIsSignInForm] = useState(true);
  const [errorMessage , setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    // Validate the form data 
    const nameValue = isSignInForm ? "" : name.current.value;

    console.log(nameValue);

    const message = checkValidData(email.current.value , password.current.value , isSignInForm ? "" : name.current.value,
    isSignInForm);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm){
    // sign up logic
      createUserWithEmailAndPassword(auth, email.current.value , password.current.value )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/222864264?v=4",
        }).then(() => {
          // Profile updated!
          console.log("curntttttttttttttttttttttt",auth.currentUser);
           const {uid , email , displayName,photoURL} = auth.currentUser; 
           dispatch(
            addUser({uid:uid , email:email , displayName:displayName , photoURL:photoURL}));
        }).catch((error) => {
          setErrorMessage(error.message);
        });
        console.log(user);  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      setErrorMessage(errorCode+ "-"+errorMessage);

    });

    }else{
    // sign in logic
      signInWithEmailAndPassword(auth, email.current.value , password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-"+ errorMessage);
      });

    }
    
  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/3d31dac6-aaf0-4e6e-8bd7-e16c5d9cd9a3/web/IN-en-20260119-TRIFECTA-perspective_cce70d60-69c5-428f-99cf-44c212fcec3f_large.jpg" alt="logo"/>
      </div>

      <form onSubmit={(e) => e.preventDefault() } className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"> 
      <h1 className="font-bold font-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input type="text" ref={name} placeholder="full name" className="p-4 my-2 w-full bg-gray-700"/>
        )}
        <input type="text" ref={email} placeholder="Email or phone number" className="p-4 my-2 w-full bg-gray-700"/>
        <input type="password" ref={password} placeholder="Enter Password" className="p-4 my-2 w-full bg-gray-700"/>
        <p className="text-red-500 font-bold text-lg py-2"> {errorMessage} </p>
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"} </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Signup Now" : "Already Registered! Sign Up Now"}</p>
      </form>
   </div>
  )
}

export default Login;
