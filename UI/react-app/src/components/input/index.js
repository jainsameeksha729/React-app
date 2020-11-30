
import React, { useState } from 'react';

const InputField = ({onChange , process , failure , placeholder, err })=>{

    return <div className="input-container">
        <input type="text" id="search-bar" onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}/>
            {process && <div class="load-bar">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div> 
        </div>}
        {failure && <div className="error-container">
            <span className="text-danger">{ err ? err.toString() : `Failed to get file information`}</span>
            </div>}
    </div>
}

export default InputField;