//External Dependies
import React, { Component } from 'react';
import * as firebase from 'firebase';

//Our Dependancies
import Emoji from './Emoji';
import Effect from './Effect';

//Firebase Setup
import firebaseDbh from '../fire'

//Import Images
import poop from '../images/poop.png'
import laugh from '../images/laugh.png'
import love from '../images/love.png'
import clap from '../images/clap.png'
import wonder from '../images/wonder.png'

let emoticons = [
  {name:'poop',img:poop},
  {name:'laugh',img:laugh},
  {name:'love',img:love},
  {name:'clap',img:clap},
  {name:'wonder',img:wonder}
]

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: '0',
      height: '0',
      transitionActive: false,
      dbArrRef: []
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillMount(){
    let instance = this;
    let dbref = firebase.database().ref('effectsArray');
    dbref.set('');
    this.setState({ dbref: dbref });
    dbref.on('value', (snapshot)=>{
      let value = snapshot.val()
      if(value !== null){
        let arrValue = Object.values(value);
        instance.setState({
          effectsArray: arrValue
        });
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth});
  }

  handleOnClick = (e) => {
    const target = e.target;
    const name = target.name;
    if(!this.state.transitionActive){
      let effectImage = this.getEmoticonImage(name);

      this.setState({
        transitionActive: true,
      }, () => stateCallBack());

      const stateCallBack = () => {
        this.state.dbref.push ({
          icon: effectImage,
          screenWidth: this.state.width
        })

        setTimeout(()=> {
          this.setState({transitionActive: false})
        }, 3000);
      }
    }
  }

  getEmoticonImage(name){
    for (let index of emoticons){
      if(index.name===name){
        return index.img
      }
    }
  }

  render() {
    let transitionActive = this.state.transitionActive, visible = '';

    if(!transitionActive){
      visible = 'visible'
    }

    return (
      <div className="main-container">
        <div className={"emoji-form " + visible}>
          {
            emoticons.map((emoti, index) => {
             return(
               <Emoji
                 key={index}
                 icon={emoti.img}
                 onClick={this.handleOnClick}
                 name={emoti.name}
                />
               )
            })
          }
        </div>
        <div className="effect-container">
          {
            this.state.effectsArray.map((effect, index) => {
              return(
              <Effect
               key={index}
               transitionActive={true}
               icon={effect.icon}
               screenWidth={effect.screenWidth}
              />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Form;
