import './App.css'
import Navigation from "./Components/Navigation"
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";

export default function App() {
    return (
        <div className="w-3/5 mx-auto my-10">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </div>
    )
}
