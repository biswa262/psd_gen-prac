import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
function App() {

  const [length,setLength] =useState(6)
  const [numbers,setNumbersY]=useState(false)
  const [splChar,setSplCharY]=useState(false)
  const [psd,setPsd]=useState("")


  //text-selection effect
  const PasswordRef =useRef(null);

  //password-generating mechanism
  const passwordGenerator = useCallback(()=>{
    let Password=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str+="0123456789"
    if(splChar) str+="`!@#$%^&*()_+-=<>?,./;:{}[]|"
    for (let i = 0; i < length; i++) {
      let char =Math.floor(Math.random()*str.length+1)
     Password+=str.charAt(char)
    }
    setPsd(Password);

  },[length,numbers,splChar,setPsd])

 useEffect(()=>{passwordGenerator()},
 [length,numbers,splChar,passwordGenerator])
 //copying Mechanism
 const copyPsd=useCallback(()=>{
  PasswordRef.current?.select()
  window.navigator.clipboard.writeText(psd)
  const button=document.querySelector('button')
  button.style.backgroundColor='green'
  button.textContent='Copied'
  
 },[psd])
 //returns the button to the original state when there is any changes
 useEffect(()=>{
  const button = document.querySelector("button");
  button.style.backgroundColor = "";
  button.textContent = "Copy";
 },[length,numbers,splChar,passwordGenerator])

  return (
    <>
<div className="bg-[#9c86f6] h-36 w-2/5 rounded-lg mx-auto mt-8 flex flex-col items-center">
  <p className="text-2xl font-serif">Password Generator</p>
  <div className="flex items-center justify-between w-3/5">
    <input type="text" value={psd} readOnly ref={PasswordRef} placeholder="Your Password is" className="rounded-md border p-2 focus:outline-none w-4/5 h-9" />
    <button onClick={copyPsd} className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-2 rounded-md h-9">Copy</button>
  </div>
{/* The flex-col classNameensures that the p and textbox remain on separate lines, while items-center aligns them vertically.
The mx-auto className on the textbox handles horizontal centering without affecting the vertical positioning. */}
  <div className="flex flex-row items-center justify-start mx-auto mt-4">
    <input type="range" className="w-2/3" min={6} max={30}  value={length} onChange={(e)=>{setLength(e.target.value)}} />
    <label className="ml-2">Length:{length}</label>
    <input type="checkbox" name="Numbers" className="ml-4" defaultChecked={numbers} onChange={()=>{setNumbersY((prev)=>!prev)}} />
    <label className="ml-2">Numbers</label>
    <input type="checkbox" name="Special Chars" className="ml-4" defaultChecked={splChar} onChange={()=>{setSplCharY((prev)=>(!prev))}} />
    <label className="ml-2 w-full">Special Chars</label>
  </div>
</div>
    </>
  );
}

export default App;
