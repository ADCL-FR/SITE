import './App.css';
import Router from './routes';
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./auth/JwtContext";

function App() {
  return ( 
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Router />            
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>   
  );
}

export default App;
