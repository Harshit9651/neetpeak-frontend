import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/scrolltotop/Scrolltotop";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Mentorship from "./pages/mentorship/Mentorship";
import  SignIn  from "./pages/Auth/SignIn/Signin";
import SignUp from "./pages/Auth/SignUp/Signup";
import ForgotPassword from "./pages/Auth/Resetpassword/Resetpassword";
import AboutUs from "./pages/About/Aboutus"
import Product from "./pages/Product/product"

function App() {
  return (
  <>
   <ScrollToTop/>
   <Navbar/>
   <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/mentorship" element={<Mentorship />}/>
          <Route path="/signin" element={<SignIn />}/> 
           <Route path="/signup" element={<SignUp />}/>  
              <Route path="/reset-password" element={<ForgotPassword />}/>  
                <Route path="/aboutus" element={<AboutUs/>}/>  
                  <Route path="/product" element={<Product/>}/>  
    </Routes>
    <Footer/>
  </>
  )
}

export default App;
