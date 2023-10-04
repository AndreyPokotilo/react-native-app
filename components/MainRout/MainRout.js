import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router/router";
// import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectedIsLoggedIn } from "../../redux/auth/auth-selectors";
import { checkUser } from "../../redux/auth/auth-operations";

const MainRout = () => {
  const  isLoggedIn  = useSelector(selectedIsLoggedIn);
  // console.log("isLoggedIn:", isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  const routing = useRoute(isLoggedIn);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export {MainRout};