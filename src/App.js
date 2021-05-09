import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import './App.css';

const initialState = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn : false,
      user: {
      id:'',
			name:'',
			email:'',
			password:'',
			entries:0,
			joined: ''
      }
  };

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) =>{
    this.setState({
      user: {
      id:data.id,
			name:data.name,
			email:data.email,
			password:data.password,
			entries:data.entries,
			joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  calculateBoxLocation = (data)=>{
    const box = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return {
      left_col: box.left_col*width,
      top_row: box.top_row*height,
      right_col: width-(box.right_col*width),
      bottom_row: height-(box.bottom_row*height)
    }
  }

  displayBox = (box) =>{
      this.setState({box:box});
  }
  onSubmit = (event)=>{
    event.preventDefault();
    this.setState({imageUrl:this.state.input});
    fetch('https://gentle-plains-72272.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          id:this.state.user.id
      })
    })
    .then(response=>response.json())
    .then((count)=>{
       Object.assign(this.state.user,{entries:count})
    });

    fetch('https://gentle-plains-72272.herokuapp.com/clarifai',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          image:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=>this.displayBox(this.calculateBoxLocation(response)))
    .catch(err=>{
      console.log(err);
      this.setState({entries:this.state.entries-1});
    });
  };
  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }else if(route==='register'||route==='signin')
    {
      this.setState(initialState);
    }
    else{

    }
    this.setState({route:route});
    
  };
  render(){
    return(
        <div className='App'>
          <Particles className='particles'
            params={particlesOptions}
            />
          <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home'
              ?<div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onSubmit}/>
              <FaceRecognition Box={this.state.box} ImageUrl={this.state.imageUrl}/>
              </div>
              :
              (
                this.state.route === 'signin'
                ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
    );
  }
}

export default App;
