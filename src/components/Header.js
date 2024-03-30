import React , {useState} from 'react'

function Header({title, handler, download}) {
    const[displayTitle, setDisplayTitle] = useState(true);
   

  return (
    <div className="header">
      {
        displayTitle ? <span onClick={() => {setDisplayTitle(false);}}>{title}</span> : <input type="text" value={title} onChange={handler} onBlur={() => setDisplayTitle(true)}/>
      }
      <button onClick={download}>Download</button>
    </div>
  )
}

export default Header
