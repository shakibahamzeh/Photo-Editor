import React,{useState} from "react";
import './App.css';
import Navbar from './components/Navbar';
import UploadIcon from '@mui/icons-material/Upload';
import { saveAs } from 'file-saver';
//import fileDownload from 'js-file-download';
//import axios from "axios";

const DEFAULT_OPTIONS=[
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
       min:0,
       max:200,
    },
    unit:"%"
  },
  {
    name:"Contrast",
    property:"contrast",
    value:100,
    range:{
       min:0,
       max:200,
    },
    unit:"%"
  },
  {
    name:"Saturation",
    property:"saturate",
    value:100,
    range:{
       min:0,
       max:200,
    },
    unit:"%"
  },
  {
    name:"GrayScale",
    property:"grayscale",
    value:0,
    range:{
       min:0,
       max:100,
    },
    unit:"%"
  },
  {
    name:"Sepia",
    property:"sepia",
    value:0,
    range:{
       min:0,
       max:100,
    },
    unit:"%"
  },
  {
    name:"Hue Rotate",
    property:"hue-rotate",
    value:0,
    range:{
       min:0,
       max:360,
    },
    unit:"deg"
  },
  {
    name:"Blur",
    property:"blur",
    value:0,
    range:{
       min:0,
       max:20,
    },
    unit:"px"
  }
]
function App() {
  
  const [options,setOptions]=useState(DEFAULT_OPTIONS);
  const [selectedOptionIndex,setSelectOptionIndex]=useState(0);
  const [image,setImage]=useState(null)
  const selectedOption=options[selectedOptionIndex];
  

  //change range
  const handelRange=({target})=>{
    setOptions(prevOptions=>{
      return prevOptions.map((option,index)=>{
        if( index !== selectedOptionIndex) return option
        return {...option,value:target.value}
      })
      
    })
  }

  // style image
  const getImageStyle=()=>{
    const filters=options.map(option=>{
      return `${option.property}(${option.value}${option.unit})`
    })
    return {filter: filters.join(" ")}
  }


//upload images

  const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}

//download image

 const downloadImage = () => {
      saveAs('image_url', 'image.jpg') // Put your image url here.
    }

 
  return (
    <div className="App">
      <div className="headerLogo">
        <h1>PHOTO EDITOR</h1>
      </div>
    <main>
      {/* filter buttons */}
       <div className="buttonContainer">
        {
          options.map((option,index)=><Navbar key={index} name={option.name}
            active={index===selectedOptionIndex}
            handelClick={()=>setSelectOptionIndex(index)}
          
          />)
        }
      </div>
      
     <div className="content">
       {/* upload images */}
        <div className="imageContainer">
          <label htmlFor="inputImage">
            Select Image <UploadIcon className="uploadIcon"/>
             <input type="file"  onChange={onImageChange} id="inputImage" />
          </label>
          <img  src={image} style={getImageStyle()} alt="pic"/> 
        </div>

       {/* range */}
      <div className="rangeContainer">
        <label>Range</label>
        <input type="range" 
        value={selectedOption.value}
        min={selectedOption.range.min}
        max={selectedOption.range.max}
       
        onChange={handelRange}
        />
        {/* download and share */}
      </div>
      <div className="btnWrapper">
        <button onClick={downloadImage} >Download</button>
        <button>Share</button>
      </div>
     </div>
    </main>
    </div>
  );
}

export default App;
