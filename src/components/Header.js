import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utls/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser , removeUser } from "../utls/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utls/constants";
import {toggleGptSearchView} from "../utls/gptSlice";
import { changeLanguage } from "../utls/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleGptSearchClick = () => {
    // toggle GPT Search button 
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-40" src={LOGO} alt="netflix-logo"/>
     {user && (
     <div className="flex p-2">
      {showGptSearch && (
        <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang =><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>
      )}
      <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg "
      onClick={handleGptSearchClick}
      >
        {showGptSearch ? "HomePage" :" GPT Search"}
      </button>
        <img className="my-2 mx-2 w-10 h-12" alt="user-img-logo" src={user?.photoURL}/>
        <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>
  )}
  </div>
  )
}

export default Header;