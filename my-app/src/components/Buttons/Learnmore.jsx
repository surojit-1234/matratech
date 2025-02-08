import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import './sass/Style.css';

function Learnmore({ name, color }) {
  return (
    <button className='learnmore-btn mt-4'>
      <span style={{backgroundColor: `${color}`, color:'#ffffff'}}>
        {name}<FaAngleRight />
      </span> 
    </button>
  )
}

export default Learnmore;