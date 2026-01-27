import { createBrowserRouter } from 'react-router-dom';
import Browse from './Browse';
import Login from './Login';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '../utls/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utls/userSlice';

const Body = () => {

  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:<Login/>,
    },
    {
      path:"/browse",
      element:<Browse/>,
    }
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid , email , displayName,photoURL} = user; 
        dispatch(addUser({uid:uid , email:email , displayName:displayName , photoURL:photoURL}));
      } else {
        dispatch(removeUser());
        // User is signed out
      }
    });
  },[])


  return (
    <div>
       <RouterProvider router={appRouter}/>
        <b/>
    </div>
  )
}

export default Body