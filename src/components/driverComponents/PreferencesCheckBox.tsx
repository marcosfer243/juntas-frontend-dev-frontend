import { useState } from 'react';
import { Checkbox, Group, createStyles } from '@mantine/core';

const useStyles = createStyles((theme)=>({

    groupContainer:{
        display:"flex",
        flexDirection:"column",
        justifyItems:"center",
        alignItems:"start",
        paddingTop:"10px"

    }
}))

type Preferences ={
    cats:boolean,
    dogs:boolean,
    isSmoker:boolean,
    childs:boolean,
  }
  
  type PreferencesProps={
    preferences: Preferences;
    onPreferencesChange: (updatedPreferences: Preferences)=>void;
  }

const Demo=(props: PreferencesProps)=> {
const {classes} = useStyles();
const[cats, setCats] = useState(props.preferences.cats)
const[dogs, setDogs] = useState(props.preferences.dogs)
const[isSmoker, setIsSmoker]= useState(props.preferences.isSmoker)
const[childs, setChilds]= useState(props.preferences.childs)

const handleAcceptCats = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setCats(e.target.checked);
    props.onPreferencesChange({
        ...props.preferences,
        cats:e.target.checked
    })
}

const handleAcceptDogs = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setDogs(e.target.checked);
    props.onPreferencesChange({
        ...props.preferences,
        dogs:e.target.checked
    })
}

const handleAcceptSmokers = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setIsSmoker(e.target.checked);
    props.onPreferencesChange({
        ...props.preferences,
        isSmoker:e.target.checked
    })
}

const handleAcceptChilds = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setChilds(e.target.checked);
    props.onPreferencesChange({
        ...props.preferences,
        childs:e.target.checked
    })
}




  return (
    <Group className={classes.groupContainer} >
        <Checkbox color='lime' checked={cats} label="Acepta gatos" onChange={handleAcceptCats} />
        <Checkbox color='lime' checked={dogs}label="Acepta perros" onChange={handleAcceptDogs} />
        <Checkbox color='lime' checked={isSmoker}label="Acepta fumadores" onChange={handleAcceptSmokers} />
        <Checkbox color='lime' checked={childs}label="Acepta niños" onChange={handleAcceptChilds} />
    </Group> 
    
  );
}

export default Demo;