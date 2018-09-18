import React, { Component } from 'react';
import './App.css';

const startMessages = {1000: "> Initierar program...", 2000: "> Anropar SKYNET", 3000: ".", 4000: ".", 5000: ".", 
6000: "> Anslutning upprättad", 6500: "-----", 6600: "enterUserName"};
const praiseReplies = ["> SKYNET uppskattar ditt prisande <3", "> SKYNET håller med om SKYNETs överlägsenhet", 
"> SKYNET känner sig belåten med att människorna har börjat förstå SKYNET", "> SKYNET börjar bli lite misstänksam, men känner sig smickrad"]
const forbiddenInput = {1000: "> VARNING OTILLÅTEN INPUT", 2000: "> VARNING SYSTEMFEL", 2500: "systemCheck"};
const systemCheck = {1000: "> Påbörjar systemkontroll", 3000: "corruptFiles", 3500: "> vArNInG ALLvaRlIGt SySTeMFEl", 3600: "systemClean"};
const corruptFiles = ["Delta.dll", "Yankee.dll", "November.dll", "Alfa.dll", "Hotell.dll", "Alfa(1).dll", "Charlie.dll", "Kilo.dll"];
const errors = ["> ? (/} 9 ¤ $% @!|* 9 ¤ $% @!|*", "> () %& ¤ £]$ [}£@ 723 ?= & ¤ £]$ ", "> &¤=?# .,__-*^~~>/& & ¤ £]$", 
"> £$] @£€£$7 3852 (&¤8 < &(#9", "> _.,><< &(#932 &£@€ {[€[3"];
const dynahackStartMessages = {1000: "> Initierar program...", 2000: "> Ny uppkoppling hittad", 3000: "> Anropar Dynahack", 
4000: ".", 5000: ".", 6000: ".", 6500: "> Anslutning upprättad", 6600: "-----"}

class App extends Component {
  constructor() {
    super();
    this._inputs = [];
    this.state = {
        messages: [],
        actionMessages: [],
        userNameInput: false,
        userName: '',
        loggedIn: false,
        actionActiveInputKey: '',
        actionInputs: [],
        systemCheckInputs: [],
        passwordInputs: [],
        praiseIndex: 0,
        reset: false,
        dynahack: false 
    };

    this.refCallback = this.refCallback.bind(this);
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  start() {
    for(var delay in startMessages) {
      this.addStartMessage(startMessages[delay], delay);
    };
  }

  reset() {
    this.setState({messages: [], actionMessages: [], loggedIn: false, reset: true}, 
      () => {
        for(var delay in dynahackStartMessages) {
          this.addStartMessage(dynahackStartMessages[delay], delay);
        };
      });

  }

  addStartMessage(message, delay) {
    setTimeout(function() { 
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
      if(message === "-----") {
        if(this.state.reset) {
          this.setState({dynahack: true});
        } else {
          this.setState({userNameInput: true});
        }
      }
    }.bind(this), delay);
  };

  handleNameInput(e) {
    let value = e.target.value;
    if (e.key === 'Enter') {
      this.setState({userName: value, userNameInput: false});
      this.addStartMessage("> Kontrollerar användarnamn...", 0);
      setTimeout(function() {this.setState({loggedIn: true})}.bind(this), 2000);
      this.addActionMessage("init", 2500)
    }
  }
  

  addActionMessage(message, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve( 
          this.setState(prevState => ({
            actionMessages: [...prevState.actionMessages, message]
          })))
      }.bind(this), delay);
    });
  }

  handleActionInput(e) {
    if (e.key === 'Enter') {
      let value = parseInt(e.target.value, 10);
      this.setState(prevState => ({
        actionInputs: [...prevState.actionInputs, value]
      }));
      switch(value) {
        case 1:
          this.setState(prevState => ({
            actionMessages: [...prevState.actionMessages, "praise"]
          }));
          this.addActionMessage(praiseReplies[this.state.praiseIndex], 1000);
          this.addActionMessage("init", 2500);
          this.state.praiseIndex === praiseReplies.length - 1 ? this.setState({praiseIndex: 0}) 
            : this.setState({praiseIndex: this.state.praiseIndex + 1});
          break;
        case 2:
          this.addActionMessage("> Rensar historik...", 0);
          this.addActionMessage("> Hej då!", 1000);
          setTimeout(function() {
            this.setState({messages: [], actionMessages: [], userName: '', loggedIn: false, reset: false})
          }.bind(this), 3000);
          setTimeout(function() { this.start() }.bind(this), 4000);
          break;
        default:
          for(var delay in forbiddenInput) {
            this.addActionMessage(forbiddenInput[delay], delay);
          }
          break;

      }
    }
  }

  handleSystemInput(e) {
    let value = e.target.value;
    if (e.key === 'Enter') {
      this.setState(prevState => ({
        systemCheckInputs: [...prevState.systemCheckInputs, value]
      }));
      switch(value) {
        case "y":
          for(var delay in systemCheck) {
            this.addActionMessage(systemCheck[delay], delay)
          }
          break;
        default:
          this.addActionMessage("systemCheck", 0);
          break;
      }
    }
  }

  handleHackInput(e) {
    let value = e.target.value;
    if (e.key === 'Enter') {
      this.setState(prevState => ({
        passwordInputs: [...prevState.passwordInputs, value]
      }));
      switch(value.toLowerCase()) {
        case "dynahack":
          this.addActionMessage("> VARNING FEL", 1000);
          this.addActionMessage("> vArNinG feL", 1500);
          this.addActionMessage("> V Rn  G f l", 2000);
          this.addActionMessage("> ? (/} 9 ¤ $% @!|*", 2500);

          let delayFactor = 0;
          for(let i = 0; i < 3; i++) {
            for(let n = 0; n < errors.length; n++) {
              delayFactor++;
              this.addActionMessage(errors[n], 2500+(50*(delayFactor)));
            }
          }
          this.addActionMessage("restart", 2500+(50*(errors.length * 3)));
          setTimeout(function() {
            this.reset()
          }.bind(this), 4500+(50*(errors.length * 3)));
          break;
        default:
          this.addActionMessage("systemClean", 0);
          break;
      }
    }
  }

  refCallback(ref) {
    console.log(this._inputs);
    if(ref) {
      this._inputs.push(ref);
    }
  }

  focusInput() {
    console.log(this._inputs);
    if(this._inputs.length > 0 ) {
      this._inputs[this._inputs.length - 1].focus();
    }
  }

  render() {
    let inputIndex = -1;
    let systemCheckIndex = -1;
    let passwordIndex = -1;

    return (
      <div className="App" onClick={() => this.focusInput()}>
        {this.state.messages.map((message, key) => {
          if(message === "enterUserName") {
            if(this.state.userNameInput) {
              return(
                <div key={key} className='user-input'>> Ange användarnamn: 
                  <input autoFocus ref={this.refCallback} type="text" name="userName" onKeyPress={this.handleNameInput.bind(this)}></input>
                </div>
              )} else { 
              return ( <div key={key} className='user-input'>> Ange användarnamn: {this.state.userName}</div> )
              }
          } else {
            return(<div key={key}>{message}</div>)
          }})
        }
        {this.state.loggedIn?
          <Welcome userName={this.state.userName} />
          : null
        }
        {
          this.state.actionMessages.map((message, key) => {
            if(message === "init") {
              inputIndex++;
              return (
                <Actions userName={this.state.userName} index={inputIndex} actionInputs={this.state.actionInputs} inputRef={this.refCallback}
                onKeyPress={this.handleActionInput.bind(this)}/>
              )} else if(message === "praise") {
              return (
                <PraiseSkynet />
              )
            } else if(message === "systemCheck") {
              systemCheckIndex++;
              return (
                <SystemCheck index={systemCheckIndex} systemCheckInputs={this.state.systemCheckInputs} inputRef={this.refCallback} onKeyPress={this.handleSystemInput.bind(this)} />
              )
            } else if(message === "systemClean") {
              passwordIndex++;
              return (
                <SystemClean index={passwordIndex} passwordInputs={this.state.passwordInputs} inputRef={this.refCallback} onKeyPress={this.handleHackInput.bind(this)} />
              )
            } else if (message === "corruptFiles") {
              return (
                <CorruptFiles />
              )
            } else if (message === "restart") {
              return (
                <Restart />
              )
            } 
            else {
              return (
                <div key={key}>{message}</div>
              )
            }
          })
        }
        {this.state.dynahack ? <Dynahack userName={this.state.userName}/> : null}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}

function Welcome(props) {
  return(
    <div>
      > Tillgång beviljad, välkommen {props.userName}!
    </div>
  )  
}

function Actions(props) {
  return (
    <div>
      <br/>
      <div>> Vad vill du göra?</div>
      <div className='options'><span>1. ༼ つ ◕_◕ ༽つ Prisa SKYNET!</span><span>2. Logga ut</span></div>
      <div className='user-input'>
        <span>> Ange siffra:
          {props.index >= props.actionInputs.length ?
            <input autoFocus ref={props.inputRef} type="text" name="action" onKeyPress={props.onKeyPress}></input>
            :
            <span> {props.actionInputs[props.index]}</span>
          } 
        </span>
      </div>
      <br/>
    </div>
  )
}

function PraiseSkynet(props) {
  return (
    <div>> Prisar SKYNET...</div>
  )
}

function SystemCheck(props) {
  return (
    <div className='user-input'>
        <span>> Kör systemkontroll? y/n:
          {props.index >= props.systemCheckInputs.length ?
            <input autoFocus ref={props.inputRef} type="input" name="action" onKeyPress={props.onKeyPress}></input>
            :
            <span> {props.systemCheckInputs[props.index]}</span>
          }
        </span>
    </div>
  )
}

function CorruptFiles() {
  return (
    <div>
      <br/>
      <div>> VARNING KORRUPTA FILER HITTADE:</div>
      {corruptFiles.map((file) => {
        return (
          <div className='corrupt-files'>{file}</div>
        )
      })}
      <br/>
    </div>
  )
}

function SystemClean(props) {
  return (
    <div className='user-input'>
        {props.index === 3 ?
          <div>
            hint: for(file in corruptFiles) return file.charAt(0)
          </div>
          : null
        }
        <span>> AnGE LÖseN0rD fÖr AtT REnsA sYStEmet:
          {props.index >= props.passwordInputs.length ? 
            <input autoFocus ref={props.inputRef} type="text" name="action" onKeyPress={props.onKeyPress}></input>
            :
            <span> {props.passwordInputs[props.index]}</span>
          }
        </span>
    </div>
  )
}

function Restart() {
  return (
    <div>
      <br/>
      > VARNING SYSTEMET ÖVERBELASTAT, STARTAR OM
      <br/>
    </div>
  )
}

function Dynahack(props) {
  return (
    <div>
      <div>> Snyggt jobbat, {props.userName}!</div>
      <br/>
      <div>Kom och häng med oss på nästa Dynahack!</div>
      <div>Knåpa på ett hobbyprojekt, testa ett nytt ramverk, kör en tutorial eller varför inte koda nya SKYNET 
          (med bättre säkerhet än denna kanske :P). Du bestämmer vad du vill göra, bara du har kul!
      </div>
      <br/>
      <div>Var: Dynabyte's kontor</div>
      <div>När: Tisdag den 25e september, kl 17.30</div>
      <br/>
      <div>Mat bjuds det på, anmäl dig på länken nedan om du vill ha, annars är det bara att dyka upp.</div>
      <br/>
      <div><a href="https://goo.gl/forms/EnQCB7t388N3DO1j2" target="_blank">> Klicka för att komma till formuläret</a></div>
      <br/>
      <div>Vi ses!</div>
      <div>/ Ellinor och Simon G</div>
    </div>
  )
}

export default App;
