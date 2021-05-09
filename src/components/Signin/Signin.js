import React from 'react';

class SigninCol extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signedEmail: '',
            signedPassword:''
        }
    };
    onEmailChange = (event) =>{
        this.setState({signedEmail: event.target.value});
    };
    onPasswordChange = (event) =>{
        this.setState({signedPassword: event.target.value});
    };
    onClickSignin = (e) =>{
        e.preventDefault();
        fetch('https://gentle-plains-72272.herokuapp.com/signin',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.signedEmail,
                password:this.state.signedPassword
            })
        })
        .then(response=>response.json())
        .then((data)=>{
            if(data.id){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
        .catch(console.log);
    };
    render(){
        const { onRouteChange } = this.props;
        return(
            <article className="pa2 br3 ba dark-gray b--black-10 mv5 mw6 center shadow-5">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onClickSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p style={{cursor:'pointer'}} onClick={()=>onRouteChange('register')} className="f6 link dim black db">Register</p>
                    </div>
                    </form>
                </main>
                </article>
        );
    }
}

export default SigninCol;