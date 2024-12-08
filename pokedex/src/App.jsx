import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/Components/Header';
import PokemonList from './Page1/Components/PokemonList';
import PokemonDetails from './Page2/Components/PokemonDetails';
import { LanguageProvider } from './common/Components/LanguageContext';
import {TypeProvider} from "./common/Components/TypeContext";

function App() {
  return (
    <LanguageProvider value='en'>
      <TypeProvider>
      <Router>
        <div id="App" className='h-auto min-h-screen w-auto bg-slate-800'>
          <Header />
          <Routes>
            <Route path="/" element={<PokemonList />} /> {/* Main Pokemon List Route */}
            <Route path="/pokemon/:id" element={<PokemonDetails />} /> {/* Detail Route */}
          </Routes>
        </div>
      </Router>
      </TypeProvider>
    </LanguageProvider>
  );
}

export default App;
