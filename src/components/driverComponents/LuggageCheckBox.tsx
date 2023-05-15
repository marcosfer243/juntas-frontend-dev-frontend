import { useState } from 'react';
import { Checkbox, Group, TextInput, createStyles } from '@mantine/core';

const useStyles = createStyles((theme)=>({

    groupContainer:{
        display:"flex",
        flexDirection:"column",
        justifyItems:"center",
        alignItems:"start",
        paddingTop:"10px"

    }
}))


type Luggage ={
  big:boolean,
  medium:boolean,
  small:boolean,
  special:string, 
 }
 
  type LuggageProps={
    luggage:Luggage;
    onLuggageChange:(updatedLuggage: Luggage)=>void;
  }

const Demo=(props: LuggageProps)=> {
const {classes} = useStyles();
const[big, setBig] = useState(false)
const[medium, setMedium] = useState(false)
const[small, setSmall]= useState(false)
const[special, setSpecial]= useState("")

  const handleBigLuggageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setBig(e.target.checked);
    props.onLuggageChange({
      ...props.luggage,
      big:e.target.checked
    })
  }

  
  const handleMediumLuggageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setMedium(e.target.checked);
    props.onLuggageChange({
      ...props.luggage,
      medium:e.target.checked
    })
  }

  const handleSmallLuggageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSmall(e.target.checked);
    props.onLuggageChange({
      ...props.luggage,
      small:e.target.checked
    })
  }

  const handleSpecialLuggageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSpecial(e.target.value);
    props.onLuggageChange({
      ...props.luggage,
      special:e.target.value
    })
  }







  return (
    <Group className={classes.groupContainer} >
        <Checkbox color='lime' checked={big} label="Grande (70x120)" onChange={handleBigLuggageChange} />
        <Checkbox color='lime' checked={medium}label="Mediano (50 x90)" onChange={handleMediumLuggageChange} />
        <Checkbox color='lime' checked={small}label="Chico (50 x 40) " onChange={handleSmallLuggageChange} />
        <TextInput
      placeholder="ej. silla de ruedas"
      label="Equipaje especial"
      value={special}
      onChange={handleSpecialLuggageChange}
    />
    </Group> 
    
  );
}

export default Demo;