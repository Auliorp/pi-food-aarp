import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing-page/landing";
import Home from "./components/home-page/home";
import Detail from "./components/detail-page/detail";
import "./App.css";
import FormRecipe from "./components/form-page/form";

function App() {
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/form" element={<FormRecipe />} />
         </Routes>
      </Router>
   );
}

export default App;
