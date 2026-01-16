import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length , setlength] = useState(8);
  const [numAllowed , setNum] = useState(false);
  const [characterAllowed , setCharacter] = useState(false);
  const [passowrd, changepass] = useState(""); 
  const passref = useRef(null);

  
const setPass= useCallback(()=>{
  let pass ="";
  let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if(numAllowed){
     str= str+'1234567890'
  }
  if(characterAllowed){
    str = str+'!@#$%^&*=-_+{}?';
  }
  for(let i= 0; i<length; i++){
 let char = Math.floor(Math.random()*str.length)
 pass = pass+ str.charAt(char);
  }
  changepass(pass);


 
},[numAllowed, characterAllowed,length,changepass]);

  useEffect(()=>{
    setPass();
  }, [numAllowed, characterAllowed, length,setPass]);

  const passwordcopy = useCallback(()=>{
     passref.current?.select();
     window.navigator.clipboard.writeText(passowrd)

  }, [passowrd])

  return (
    <>
    <div className='items-center mx-auto'>
          <h1 className="text-6xl text-7xl font-black  text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-gray-500">
      
        PASSWORD GENERATOR
      </h1>
    </div>
    <div className='items-center w-full max-w-md mx-auto  bg-gray-800  my-8 p-1 rounded-lg'>
    <div className='flex m-2 bg-amber-100 rounded-lg overflow-hidden'>
     <input type='text' className='border-zink-900 font-bold text-black w-full' value={passowrd}
     readOnly
     placeholder='Password'
     ref={passref}>
     </input>
     <button onClick={passwordcopy} className='bg-orange-400 w-[50px] active:scale-90 font-bold text-xl'
    >
      Copy
     </button>
    </div>
    <div  className='flex gap-2  m-2'>
      <div className='flex '>
        <input type='range'
        min={8}
        max={60}
        value={length}
        onChange={(e)=>{
          setlength(e.target.value)
        }}className='cursor-pointer'>
        </input>
        <label className='text-orange-400 font-bold '>
          Length: {length}
        </label>
    
      </div>
      <div className='flex'>
        <input type='checkbox'
        defaultChecked={characterAllowed}
        id='charInput'
        onChange={()=>{
          setCharacter((prev)=>!prev);
        }}
        className=''>
        </input>
        <label htmlFor='charInput' className='text-orange-400 font-bold'>
          Characters
        </label>
      </div>
        <div className='flex'>
        <input type='checkbox'
        defaultChecked={numAllowed}
        id='numberInput'
        onChange={()=>{
          setNum((prev)=>!prev);
        }}
        className=''>
        </input>
        <label htmlFor='numberInput' className='text-orange-400 font-bold'>
          Numbers
        </label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App