import './App.css';
import {useState,useEffect} from 'react';
import {createContext} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Home} from './Home';
import {Write} from './Write';
import {About} from './About';
import {Login} from './Login';
import {Signup} from './Signup';
import {Read} from './Read';
import {Logout} from './Logout';
import {MyNavbar} from './Navbar';

export const AppContext = createContext();

function App() {
  const client = new QueryClient({defaultOptions:{
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });
  const [darkMode,setDarkMode] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
      if(localStorage.getItem('dark') === 'true'){
        setDarkMode(true);
      }

      if (localStorage.getItem('access_token') !== null) {
          setIsAuth(true); 
        }
      }, [isAuth]);
    const appStyle = {
      backgroundColor:'#2E4F4F',
    }

  return (
    <>
    {darkMode?
    <>
    <div className="App" style={appStyle}>
      <AppContext.Provider value = {{isAuth,darkMode,setDarkMode}}> 
        <QueryClientProvider client={client}>
          <Router>
            <MyNavbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/write" element={<Write/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/read" element={<Read/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="*" element={<h1>Page not found</h1>}/>
            </Routes>
        </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>

    <footer className="footer" style={{backgroundColor:'#0E8388'}}>
      <div>
        <a href="#">Eeori?</a>
        <span>&copy; 2023</span>
      </div>
      <div>
        <span>Powered by </span>
        <a href="#">Eeori?</a>
      </div>
    </footer>
    </>
    :
    <>
    <div className="App">
      <AppContext.Provider value = {{isAuth,darkMode,setDarkMode}}> 
        <QueryClientProvider client={client}>
          <Router>
            <MyNavbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/write" element={<Write/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/read" element={<Read/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="*" element={<h1>Page not found</h1>}/>
            </Routes>
        </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>

    <footer className="footer">
      <div>
        <a href="#">Eeori?</a>
        <span>&copy; 2023</span>
      </div>
      <div>
        <span>Powered by </span>
        <a href="#">Eeori?</a>
      </div>
    </footer>
    </>
    }
    </>
  );
}

export default App;
