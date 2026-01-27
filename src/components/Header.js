import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utls/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");

    });
  }
  return (
    <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-40" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="netflix-logo"/>
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