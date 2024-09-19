
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SideNavbar from './components/SideNavbar';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import Products from './components/Products';
import AddCategory from './components/AddCategory';

function App() {
  return (
    <>
    {/* <NoteState> 
      <Router>
        <Navbar />
        <Alert message="This is amazing React course" />
        <div className="container">
            <Route exact path="/home">
              <Home />
             </Route>
             <Route exact path="/about">
             <About />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
             <Signup />
            </Route>
        </div>
      </Router>
     </NoteState>  */}

    
    <Router>
    <Navbar />
      <Routes>
        <Route path='/' element={<Login />}>
         </Route>
        <Route  path="/auth" element={ <SideNavbar/>}>
         <Route path='' element={<Home/>}></Route>
         <Route path='Category' element={<Category />}>
         </Route>
        <Route path='Subcategory' element={<Subcategory/>}/>
        <Route path='Product' element={<Products/>}/>
        <Route path='AddCategory' element={<AddCategory/>}/>
        </Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
