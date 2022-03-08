//Password Component which can be shown or hidden. Allows use to change password visibility.
import React, {Component} from 'react';



class PasswordShowHide extends Component {

    constructor(props) {
        super(props);
    

    this.state = {
        hidden: true,
        password: '',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
}
handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  clearHighlightPassword() {
    document.getElementById("password").style.boxShadow = "none";
}

  render() {
    return (
      <div>
           {/*Password Field*/}
        
        <input
          className="loginInput passwordClass"
          id="password"
          name="password"
          type={this.state.hidden ? 'password' : 'text'}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onFocus={this.clearHighlightPassword}
        /><br></br>
        {/*}An element to toggle between password visibility*/}
        <input className ="pass-visible" type="checkbox" onChange={this.toggleShow}></input><span class="loginLabel pass-visible" style={{marginLeft: "10pt"}}>Show Password</span><br></br>
      </div>
    );
  }

}