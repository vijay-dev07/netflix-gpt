import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utls/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser , removeUser } from "../utls/userSlice";
import { LOGO } from "../utls/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");

    });
  }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid , email , displayName,photoURL} = user; 
        dispatch(addUser({uid:uid , email:email , displayName:displayName , photoURL:photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component un mounts
    return () => unsubscribe();
  },[])

  return (
    <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-40" src={LOGO} alt="netflix-logo"/>
     {user && (
     <div className="flex">
        <img className="my-2 mx-2 w-10 h-12" alt="user-img-logo" src={user?.photoURL}/>
        <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>
  )}
  </div>
 


  )
}

export default Header;