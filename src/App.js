import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageUploader from "./Components/Uploadphoto/uploadPhoto";
import LoginScreen from "./Screens/LoginScreen/loginScreen";
import MainScreen from "./Screens/MainScreen/mainScreen";
import SignupScreen from "./Screens/SignupScreen/signupScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense>
              <LoginScreen />
            </Suspense>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Suspense>
              <SignupScreen />
            </Suspense>
          }
        />
        <Route
          exact
          path="/maincontent"
          element={
            <Suspense>
              <MainScreen />
            </Suspense>
          }
        />
        <Route
          exact
          path="/uploadphoto"
          element={
            <Suspense>
              <ImageUploader />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
