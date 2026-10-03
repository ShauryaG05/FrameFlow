import {BrowserRouter, Routes, Route} from "react-router-dom"
import Intro from "./components/Intro"
import Story from "./Scenes/Story"
import CakeScene from "./Scenes/CakeScene"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/papa" element={<Story />} />
        <Route path="/cake" element={<CakeScene />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;