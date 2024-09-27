import React, { useState , useCallback ,useEffect , useRef } from 'react'

const App = () => {
  const [length  , setlength] = useState(8);
  const [numberAllowed , setnumberAllowed] = useState(false);
  const [charAllowed , setAllowed ] = useState(false);
  const [password , setpassword ] = useState()
  
  // useRef hook
  const passwordRef = useRef(null);

  const passwordGerenrator = useCallback(()=>{
    let pass = " "
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_{}:"
    for(let i=1 ; i<=length ; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  } , [length, numberAllowed , charAllowed, setpassword])
  
  const CopyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{passwordGerenrator()} , [length,numberAllowed , charAllowed , passwordGerenrator])
  
  return (
   <>
   <div className='w-full max-w-3xl mx-auto shadow-md rounded-lg px-5 my-8 text-orange-500 bg-gray-800 text-3xl mt-20 ' >
    <h1 className='text-white text-center mt-48 '>Password</h1>
    <div className=' flex shadow rounded-lg overflow-hidden mb-4 mt-3 '>
    <input 
    type="text"
     value={password}
     className='outline-none w-full py-1 px-3 '
     placeholder='password'
     readOnly
     ref={passwordRef}
   />
   <button 
    onClick={CopyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ' >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2' >
      <div className='flex items-center gap-x-1 '>
        <input type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}} />
        <label >Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
         type="checkbox" 
         defaultChecked={numberAllowed}
         id='numberInput'
         onChange={()=>{
           setnumberAllowed((prev)=>!prev);
         }}
         />
         <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
         type="checkbox" 
         defaultChecked={charAllowed}
         id='characterInput'
         onChange={()=>{
           setnumberAllowed((prev)=>!prev);
         }}
         />
         <label htmlFor="characterInput">Character</label>
      </div>

    </div>
    <div className='h-9'></div>
   </div>
   </>
  )
}

export default App
