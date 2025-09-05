import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/scrolltotop/Scrolltotop";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Mentorship from "./pages/mentorship/Mentorship";

function App() {
  return (
  <>
   <ScrollToTop/>
   <Navbar/>
   <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/mentorship" element={<Mentorship />}/>
    </Routes>
    <Footer/>
  </>
  )
}

export default App;
