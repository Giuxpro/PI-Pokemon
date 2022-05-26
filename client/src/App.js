import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "../src/components/landing/Landing";
import Home from "../src/components/home/Home";
import Detail from "../src/components/detail/Detail";
import PokemonCreate from "../src/components/form/PokemonCreate"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path='home' element={<Home/>}/>
          <Route exact path='/pokemons/:id' element={<Detail/>}/>
          <Route exact path='/pokemos' element={<PokemonCreate/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
