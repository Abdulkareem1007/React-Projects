import "./App.css";
import { useState, useEffect, useCallback, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowCharacter, setAllowCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useCallback us use here to optimize the project. it keep the function and its dependencies in cache.

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumber) {
      str += "0123456789";
    }
    if (allowCharacter) {
      str += "!@#$%^&*(){}~`";
    }

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    // setLength(length);
    // console.log(pass);
  }, [length, setPassword, allowNumber, allowCharacter]);

  // run every time once the page reload and when ever when the depencencis change.

  useEffect(() => {
    generatePassword();
  }, [length, setPassword, allowNumber, allowCharacter]);



  // to copy the password to clipboard. using useRef. (use to take reference of any thing.)
 const copyPassworToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);


 },[password])

  const passwordRef = useRef(null);

  return (
    <div className="mainDiv">
      <div className="containerDiv">
        <h3>Password Generator</h3>
        <div className="inputsDiv">
          <input
            type="text"
            placeholder="password"
            value={password}
            readOnly /*passing reference of this input*/
            ref={passwordRef}
            
          />
          <button onClick={copyPassworToClipboard} >Copy</button>
        </div>
        <div className="parameterDiv">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>{length} Length </label>
          <label htmlFor="">Numbers</label>
          <input
            type="checkbox"
            checked={allowNumber}
            onChange={() => {
              setAllowNumber((prev) => !prev);
            }}
          />
          <label>Characters</label>
          <input
            type="checkbox"
            checked={allowCharacter}
            onChange={() => {
              setAllowCharacter((prev) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}
