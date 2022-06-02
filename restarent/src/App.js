
import './App.css';
import React from 'react';
import { BrowserRouter, Link, Route ,Routes} from 'react-router-dom';
import Revenue from './features/food/Revenue';
import Placeorder from './features/food/Placeorder';
import Login from './features/food/Login';
import { Provider } from 'react-redux';
import store from './app/store';
import Home from './features/food/Home';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Routes>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="Revenue" element={<Revenue></Revenue>}></Route>
            <Route path="/placeoreder" element={<Placeorder></Placeorder>}></Route>
            <Route path="/" element={<Login></Login>}></Route>
     </Routes>
    </div>
    </BrowserRouter>
    </Provider>
  );
}
export default App;
