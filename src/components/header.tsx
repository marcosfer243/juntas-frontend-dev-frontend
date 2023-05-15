import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    MediaQuery
  } from '@mantine/core';

  //Next
  import Image from 'next/image';
  import { useRouter } from 'next/router';

  import { useDisclosure } from '@mantine/hooks';
  //images
  import { logoJuntas } from '@/assets/images';
  
  const useStyles = createStyles((theme) => ({
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: "white",
      //theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: rem(42),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color:"black"
      }),
    },
  
    subLink: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),
  
      '&:active': theme.activeStyles,
    },
  
    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  }));
  

  
  export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const router= useRouter();

    const goToAuth= (path: String)=>{
      router.push(`/auth/${path}`)
      closeDrawer()
    }


  
    return (
      <Box pb={0}>
        <Header style={{backgroundColor:'#FF66B3'}} height={60} px="lg">
          <Group position="apart" sx={{ height: '100%' }}>
          <MediaQuery
            query="(max-width: 50rem)"
            styles={{ alignSelf:"center", margin:"auto" }}
            >
                <Image  onClick={()=>router.push('/')} style={{cursor:"pointer"}} src={logoJuntas} height={50} width={200} alt={`logo-juntas`} 
                />
           </MediaQuery>
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <a href="#" className={classes.link}>
                Home
              </a>
              <a href="#" className={classes.link}>
                Ventajas
              </a>
              <a href="#" className={classes.link}>
              ¿Cómo funciona?
              </a>
            </Group>
  
            <Group className={classes.hiddenMobile}>
              <Button onClick={()=>goToAuth("login")} variant="default">Inicia Sesión</Button>
              <Button onClick={()=>goToAuth('register')} style={{backgroundColor:"transparent"}} >Registrate</Button>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Opciones"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <a onClick={closeDrawer} style={{color:"black"}} href="#" className={classes.link}>
              Home
            </a>
            <a onClick={closeDrawer} style={{color:"black"}} href="#" className={classes.link}>
              Ventajas
            </a>
            <a onClick={closeDrawer} style={{color:"black"}} href="#" className={classes.link}>
            ¿Cómo funciona?
            </a>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Group position="center" grow pb="xl" px="md">
              <Button onClick={()=>goToAuth('login')} variant="default">Inicia Sesion</Button>
              <Button onClick={()=>goToAuth('register')} style={{backgroundColor:"#FF66B3"}} >Registrate</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }