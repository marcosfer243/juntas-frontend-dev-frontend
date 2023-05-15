import {
    AppShell,
    Footer,
    Group,
    Header,
    Text,
    useMantineTheme,
    MediaQuery
} from "@mantine/core";

import {useMobile} from "./../../hooks/useMobile"

import { HeaderMegaMenu } from "./header.tsx";

import {FooterLinks }from "./footer.tsx"

import {useRouter} from "next/router"


export const ApplicationContainer = ({children}) => {
  const theme = useMantineTheme();
  const isMobile = useMobile();
  const router = useRouter();

  console.log(router.pathname)

  const highlight = {
    display:"none",
    
    [theme.fn.smallerThan('md')]: {
      display:"none"
    },
  };


    const data = [

            {
              title: "Home",
              links: [
                {
                  label: "Soy Pasajera",
                  link: "#"
                },
                {
                  label: "Conduzco",
                  link: "#"
                },
                {
                  label: "Viajes Activos",
                  link: "#"
                },
              ]
            },
            {
              title: "Perfil",
              links: [
              ]
            },
            {
              title: "Contacto",
              links: [
                {
                  label: "Seguinos en Instagram",
                  link: "#"
                },
                {
                  label: "Envianos un mail",
                  link: "#"
                },
              ]
            }
          


        
    ]

    return(
        <AppShell
        styles={{
            main: {
                background: '#fffff',
                width: "100vw",
                minHeight:"100vh",
                display:"flex",
                justifyContent:"center",
                alignContent:"center",
                padding:0,

                [theme.fn.smallerThan('sm')]: {
                 position:"relative"
                },
            }
        }}
        footer={
            (router.pathname === '/app/home' || router.pathname === '/' || router.pathname === '/app/welcome')?(
              <FooterLinks data={data}/>
              ):(
              <></>
            )

        }
        header={
           <HeaderMegaMenu></HeaderMegaMenu>
        }
        
        >
          {children}
        </AppShell>
    )
}