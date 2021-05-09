import React from 'react';
import './Navigation.css';
const Navigation = ({onRouteChange,isSignedIn}) => {
    if(isSignedIn){
      return(
        <div>
          <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p style={{cursor:'pointer'}} onClick={()=>onRouteChange('signin')}>Signout</p>
          </nav>
        </div>
      );
    }else
    {
      return(
        <div>
          <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <nav>
            <p style={{cursor:'pointer'}} onClick={()=>onRouteChange('signin')}>SignIn</p>
            </nav>
            <nav>
            <p style={{cursor:'pointer'}} onClick={()=>onRouteChange('register')}>Register</p>
            </nav>
          </nav>
        </div>
      );
    }
    
}

export default Navigation;