import React from "react";
import './App.css';

function transliteral(str){
  const ru={
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', ' ': '-'
  }, n_str=[];

  str=str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for ( var i = 0; i < str.length; ++i ) {
    n_str.push(
           ru[ str[i] ]
        || ru[ str[i].toLowerCase() ] == undefined && str[i]
        || ru[ str[i].toLowerCase() ].replace(/^(.)/,
         function ( match ) { return match.toUpperCase() })
    );
 }
 let el = document.querySelector('#trText');
 let res = document.querySelector('#result');

 el.addEventListener('keyup', e=>{
   res.textContent = transliteral(e.target.value)
 })
 return n_str.join('');
}

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currDate: new Date()
    };
  }

  componentDidMount(){
    this.handlerOfTimer=setInterval(()=> this.timerAction(), 1000);
  }

  timerAction(){
    this.setState({currDate: new Date()});
  }

  componentWillMount(){
    clearInterval(this.handlerOfTimer);
  }

  render(){
    return(
      <div className="App">
          <h1>{this.state.currDate.toLocaleTimeString()}</h1>
          <input type="text" id="trText" value=""/>
          <div id="result"></div>
          <>
          <transliteral></transliteral>
          </>
      </div>
    );
  }
}

