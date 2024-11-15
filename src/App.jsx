import { useState } from "react";
import { useCallback ,useEffect,useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllow, charAllow, setpassword]);

  const copypass= useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllow,charAllow,passwordGenerator])
  return (
    <div className="flex items-center justify-center min-h-screen m-0">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black-500 bg-gray-800 ">
        <h1 className=" text-center text-white my-4 font-bold">Random Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4'">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
            
          />
          <button onClick={copypass} className="outline-none bg-blue-700 text-white font-bold px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <br />
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="text-white font-bold">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 bg-gray-800">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setnumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white font-bold" >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 bg-gray-800">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="characterInput"
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white font-bold" >Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
