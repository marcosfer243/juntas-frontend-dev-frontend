import React,{useState, useEffect, useRef, MutableRefObject} from 'react'

//Mantine Core
import { createStyles, Container, Title, Text, Button, rem, TextInput,  Group, Skeleton,Slider, FileInput, Modal } from '@mantine/core';

//Next
import { useRouter } from 'next/router';
import getConfig from 'next/config';

//Components
import StepperTime from '@/components/driverComponents/StepperTime';
import { useForm } from '@mantine/form';
import Calendar from '@/components/driverComponents/Calendar';
import PreferencesCheckBox from '@/components/driverComponents/PreferencesCheckBox'
import LuggageCheckBox from '@/components/driverComponents/LuggageCheckBox'


//Google maps Api
import { useJsApiLoader, GoogleMap, MarkerF, Autocomplete, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";
import { useDisclosure } from '@mantine/hooks';

//Cookies
import cookies from "js-cookie";


const useStyles = createStyles((theme)=>({
  root:{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    minHeight:"100%",

    [theme.fn.smallerThan('md')]: {
      flexDirection:"column",
      position:"relative",
    },

  },


  column_one:{
    width:"50%",
    height:"100%",
    marginLeft:"1rem",

    [theme.fn.smallerThan('md')]: {
      width:"100%",
      height:"100%",
      marginLeft:"0",
    },

  },

  column_two:{
    width:"50%",
    maxHeight:"100%",
    display: "grid",
    gridTemplateColumns:"1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridGap: "20px",
    justifyItems:"center",
    justifyContent:"center",
    paddingTop:"10px",
    paddingBottom:"30px",
    position:"relative",

    [theme.fn.smallerThan('md')]: {
      width:"100%",
      gridTemplateColumns:"1fr",
      gridTemplateRows: "1fr",
      paddingBottom:"7rem"
    },
  },

  header:{
    height:"8%",
    width:"100%",
    padding:"auto",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",

    [theme.fn.smallerThan('md')]: {
      flexDirection:"column",
      height:"20%",
    },
  },

  

  form:{
    width:"60%",
    display:"flex",
    alignItems:"center",

    [theme.fn.smallerThan('md')]: {
      width:"100%",
      flexDirection:"column"
    },
  },

  input:{
    width:"100%",
    margin:"4px",
    padding:"6px"
  },

  stepper:{
    width:"40%",
    marginRight:"4rem",
    backgroundColor:"white",
    
    [theme.fn.smallerThan('md')]: {
      top:"40px",
      position:"fixed",
      width:"100%",
      marginRight:"0",
      marginTop:"20px",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    },
  },

  content:{
    width:"100%",
    display:"flex",
    height:"85%",

    [theme.fn.smallerThan('md')]: {
      flexDirection:"column",
      height:"250vh"
    },
    
  },

  seatsAvailable:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    height:"40%",
    paddingTop:"16px"
  },

  fullWidth:{
  width:"100%"
  },

  travelInfo:{
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center"
  },

  optionsDivContainer:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },

  addVehicle:{
    display:"flex",
    minHeight:"40%",
    flexDirection:"column",
    marginTop:"16px",
  },

  formContainer:{
    display:"flex",
    flexDirection:"row",
    height:"90%",
    justifyContent:"space-around",
    alignItems:"center",

    [theme.fn.smallerThan('md')]: {
      flexDirection:"column",
      width:"100%",
      marginBottom:"30rem"
    },

  },

  formDiv:{
    display:"flex", flexDirection:"column", justifyContent:"space-around", width:"30%",

    [theme.fn.smallerThan('md')]: {
      width:"90%"
    },


  },

  createButton:{
    position:"absolute",
    bottom:"10%",
    right:"10%",

    [theme.fn.smallerThan('md')]: {
      bottom:"5%",
      right:"auto",
      left:"auto"
    },
  }


}))

const center = {
  lat:-31.4167,
  lng:-64.1833
}

type Preferences ={
  cats:boolean,
  dogs:boolean,
  isSmoker:boolean,
  childs:boolean,
}

type Luggage ={
 big:boolean,
 medium:boolean,
 small:boolean,
 special:string, 
}

type Vehicle={
  patent:string,
  brand:string,
  model:string,
  color:string
}

interface MarksObject {
  value:number,
  label:string,
}

const url = process.env.NEXT_PUBLIC_JUNTAS_API_URL;

type Props = {}


const { publicRuntimeConfig } = getConfig();
const { places } = publicRuntimeConfig;

const driver = (props: Props) => {
 const {classes} = useStyles()
const router = useRouter();
const [map, setMap] = React.useState<google.maps.Map | null>((null))
const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult | null>(null);
const [distance, setDistance] = React.useState<string|undefined>("")
const [duration, setDuration] = React.useState<string|undefined>("")
const [value, setValue] = useState<number>(1);
const[preferences, setPreferences] = React.useState<Preferences>({
  cats:false,
  dogs:false,
  isSmoker:false,
  childs:false,
});
const [luggage, setLuggage] = React.useState<Luggage>({
  big:false,
  medium:false,
  small:false,
  special:"",
})
const [opened, { open, close }] = useDisclosure(false);
const [depDate, setDepDate] = useState<Date | null>(null);
const [vehicle, setVehicle] = useState<Vehicle|null>(null)
const [reqOrigin, setReqOrigin] = useState<string>("");
const [reqDestination, setReqDestination] = useState<string>("")



const handlePreferencesChange = (updatedPreferences: Preferences)=>{
  setPreferences(updatedPreferences)
}

const handleLuggageChange = (updatedLuggage: Luggage)=>{
  setLuggage(updatedLuggage)
}

const MARKS: MarksObject[] = [
  { value: 0, label: '1' },
  { value: 25, label: '2' },
  { value: 50, label: '3' },
  { value: 75, label: '4' },
  { value: 100, label: '+5' },
];

//Calcular valor del slider.

const originRef = useRef<HTMLInputElement>(null)

const destinationRef = useRef<HTMLInputElement>(null)

const {isLoaded}=useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  libraries:places,
})

//if(!isLoaded){
 // return <Skeleton/>
//}


const form = useForm({
  initialValues: {
    patent:"",
    brand:"",
    model:"",
    color:""
  },

  validate: {
    patent: (value) => (value.length < 6 ? "Patente inválida" : null),
    brand: (value) => (value.length > 16 ? "16 caracteres como máximo" : null),
    model: (value) => (value.length > 16 ? "16 caracteres como máximo" : null),
    color: (value) => (value.length > 16 ? "16 caracteres como máximo" : null),
  },
});

  const setRoute= async()=>{

    console.log(originRef)
    if(originRef.current?.value  === '' || destinationRef.current?.value === ''){
      console.log("No sirve")
      return;
    }else{
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();

      const originValue = originRef.current!.value;

      const destinationValue = destinationRef.current!.value
  
      const data = await directionsService.route({
        origin:originValue,
        destination:destinationValue,
        travelMode:google.maps.TravelMode.DRIVING
  
      })

      setDirectionsResponse(data);
      setDistance(data.routes[0].legs[0].distance!.text)
      setDuration(data.routes[0].legs[0].duration!.text)
      setReqOrigin(data.routes[0].legs[0].start_address)
      setReqDestination(data.routes[0].legs[0].end_address)
    }
  }


  const handleCreateJourney = async ():Promise<any>=>{
console.log(getTokenCookie())
    const cookie:string|undefined = getTokenCookie();
    const formatedDate:string = getFormatedDate(depDate);
    const cityArr = reqDestination.split(',')[0];
    const cityDep = reqOrigin.split(",")[0];
    const provinceArr = reqDestination.split(',')[1];
    const provinceDep = reqOrigin.split(',')[1];

    const arrivalDate = getArrivalDate(depDate)
    

  
    let headersOptions = {
      "Accept":"*/*",
      "Authorization":`Bearer ${cookie}`,
      "Content-Type":"application/json"
    }
  
    let bodyContent={
      acceptChild:preferences.childs,
      acceptSmoker:preferences.isSmoker,
      cityArr:cityArr,
      cityDep:cityDep,
      arrivalDate:"2023-06-13",
      departureDate:formatedDate,
      emptySeats:value,
      luggageBig:luggage.big,
      luggageMid:luggage.medium,
      luggageSma:luggage.small,
      modelName:vehicle?.model,
      patentNumber : vehicle?.patent,
      petFriendly:preferences.dogs,
      primaryBrand : vehicle?.brand,
      provinceArr:provinceArr,
      provinceDep:provinceDep,
      vehicleColor : vehicle?.color,
    }

    try {
      await fetch(`${url}/journey`,
      {
       method:"POST",
       body:JSON.stringify(bodyContent),
       headers:headersOptions 
      }).then(response=>response.json())
      .then(data=>console.log(data))
      setTimeout(() => {
        router.push("/app/tripcreated")
      }, 2000);
    } catch (error) {
      console.log(error)
    }


  
  }

  function getArrivalDate(depDate:Date|null):string {
    const hoursToAdd= duration;
    let arrivalDate = depDate!.setHours(parseInt(depDate!.getHours()+hoursToAdd!))

    return arrivalDate.toString();
  }
  
  function getFormatedDate (date: Date|null):string{
    const year = date!.toISOString().slice(0, 4);
    const month = date!.toISOString().slice(5,7);
    const day = date!.toISOString().slice(8,10);
  
    const formatedDate = `${year}-${month}-${day}`;
  
    return formatedDate;
  
  }
  
  function getTokenCookie():string|undefined {
    const cookie: string|undefined = cookies.get("juntas_access-cookie")
    return  cookie;
  }
  
   
  return (
    <div className={classes.root}>
          <Modal opened={opened} onClose={close} centered>
          <Title order={4} align={"center"} fw={"normal"} >Estás segura que deseas crear este viaje? </Title>
          <div style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-around", marginTop:"20px"}} >
            <Button onClick={close} variant='default' >Cancelar</Button>
            <Button color='pink' onClick={handleCreateJourney} >Aceptar</Button>
          </div>
      </Modal>
        <Title order={3} align={"center"} style={{marginTop:"40px"}} >Comienza configurando tu ruta: </Title>
        <div className={classes.header}>
        <form className={classes.form} onSubmit={form.onSubmit((values) => console.log(values))}>
          {
            !isLoaded?(
              <>
              <TextInput
              required
              type='text'
              className={classes.input}
              placeholder="origen"
              radius="md"
              ref={originRef}
              />
              <TextInput
              required
              type='text'
              className={classes.input}
              placeholder="destino"
              ref={destinationRef}
              radius="md"
          />
              </>
            ):(
              <>
          <Autocomplete options={{componentRestrictions: { country: "arg" }}} >
        <TextInput
        required
        type='text'
        className={classes.input}
        placeholder="origen"
        radius="md"
        ref={originRef}
        />
          </Autocomplete>
          <Autocomplete options={{componentRestrictions: { country: "arg" }}}>
        <TextInput
        required
        type='text'
        className={classes.input}
        placeholder="destino"
        ref={destinationRef}
        radius="md"
    />
          </Autocomplete>
              </>
            )
          }
        <Group>
          <Button style={{backgroundColor:"#FF66B3"}} radius={"md"} onClick={()=>setRoute()} type="submit">
            Calcular
          </Button>
        </Group>
      </form>
      <div className={classes.stepper} style={{zIndex:"10", paddingTop:"5px", paddingBottom:"5px", paddingRight:"8px", paddingLeft:"8px"}} >
    <StepperTime/>
      </div>
        </div>
        <div className={classes.content}>
        <div className={classes.column_one}>
          <div className={classes.travelInfo}>
          <span>Duración: {duration}</span>
          <span>Distancia: {distance}</span>
          </div>
          {!isLoaded ? (
            <Skeleton height={200} radius="xl" />
          ):
          (
        
          <GoogleMap center={center} zoom={6} mapContainerStyle={{width:"100%", height:"50%", borderRadius:"20px", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}
          options={{
            mapTypeControl:false,
            streetViewControl:false,
            zoomControl:true
          }}
          onLoad={map=>setMap(map)}
          >
                {directionsResponse && <DirectionsRenderer 
        directions={directionsResponse}
        />} 
          </GoogleMap>
          )}
          <div className={classes.addVehicle}>          
            <div className={classes.formContainer} >
          <form className={classes.formDiv} onSubmit={form.onSubmit((values) => setVehicle(values))}>
          <Title align='center' color='gray' order={5} fw="normal">Datos del vehículo</Title>
        <TextInput
        style={{marginTop:"8px"}}
          withAsterisk
          required
          placeholder="Patente"
          {...form.getInputProps('patent')}
        />
         <TextInput
         required
          withAsterisk
          style={{marginTop:"8px"}}
          placeholder="Marca"
          {...form.getInputProps('brand')}
        />
         <TextInput
         required
          withAsterisk
          style={{marginTop:"8px"}}
          placeholder="Modelo"
          {...form.getInputProps('model')}
        />
         <TextInput
         required
          withAsterisk
          style={{marginTop:"8px"}}
          placeholder="Color"
          {...form.getInputProps('color')}
        />
        <Button variant="light" color="pink" style={{marginTop:"8px"}} type='submit'>Guardar</Button>
      </form>
      <form className={classes.formDiv} onSubmit={form.onSubmit((values) => console.log(values))}>
      <Title align='center' color='gray' order={5} fw="normal">Carnet de Conducir</Title>
      <FileInput
      required
      placeholder="Selecciona una imagen"
      style={{marginTop:"8px"}}
      label="Frontal"
      withAsterisk
    />
        <FileInput
        required
      placeholder="Selecciona una imagen"
      style={{marginTop:"8px"}}
      label="Dorso"
      withAsterisk
    />
      </form>
            </div>
          </div>
        </div>
        <div className={classes.column_two} >
          
          <div className={classes.optionsDivContainer} >
          <Title order={3} fw="normal">Tus condiciones</Title>
          <PreferencesCheckBox preferences={preferences} onPreferencesChange={handlePreferencesChange} />
          </div>
          <Calendar depDate={depDate} setDepDate={setDepDate}/>
          <div className={classes.optionsDivContainer} >
          <Title order={3} fw="normal">Equipaje</Title>
          <LuggageCheckBox luggage={luggage} onLuggageChange={handleLuggageChange} />
          </div>
          <div className={classes.seatsAvailable} >
          <Text align='center' fw='bold' fz='sm'>Elige la cantidad de asientos disponibles:</Text>

          <Slider
          color="pink"
          value={value}
          onChange={setValue}
          labelAlwaysOn
          size="xl"
    style={{width:"90%", marginTop:"28px"}}
        label={(val: number) => MARKS.find((mark: MarksObject) => mark.value === val)?.label}
        defaultValue={50}
        step={25}
        marks={MARKS}
        styles={{ markLabel: { display: 'none' } }}
      />
          </div>
          <Button onClick={open} color="pink" className={classes.createButton} >Crear Viaje</Button>
        </div>
        </div>
    </div>
  )
}

export default driver