import { BrowserRouter, Route, Routes } from "react-router";
import { store } from './redux/Store'
import { Provider } from "react-redux";
import "./App.css"
import Login from "./components/auth/Login";
import NewPassword from "./components/auth/NewPassword";
import DashboardLayout from "./components/dashboard/dashbordlayout/DashboardLayout";
import { generateToken, messaging } from "./firebase/Firebase"
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from 'react-hot-toast';
import Home from "./components/dashboard/landingpage/Home";
import FAQSection from "./components/dashboard/landingpage/FAQSection";
import ContactForm from "./components/dashboard/landingpage/ContactForm";
import WelcomePage from "./components/auth/WelcomePage";
import MultiStepForm from "./components/dashboard/profile/MultiStepForm";

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {      
      toast.success(payload?.notification?.body);     
    });
  }, [])

  return (
    <>
      <div>
        <Toaster
          position="top-center"         
        />
      </div>     

      <Provider store={store}>
        <BrowserRouter>
          <Routes>           
            <Route path="/login" element={<Login />} />           
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/*" element={<DashboardLayout />} />            
            <Route path="/" element={<Home />} />            
            <Route path="/faq" element={<FAQSection />} />            
            <Route path="/contact" element={<ContactForm />} />            
            <Route path="/welcome" element={<WelcomePage />} />            
            <Route path="/profileinformation" element={<MultiStepForm />} />                       
          </Routes>
        </BrowserRouter>
      </Provider>
     
    </>
  );
}

export default App;
