import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';

//images
import { welcomeImage } from '@/assets/images';

//Next
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:`url(https://i.ibb.co/Xsnm7s6/welcome-Image.png)`
      ,
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    height:"100%",
    width:"100%",
    display:"flex",
    alignItems:"center"
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:"center",

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,
    alignSelf:"center",

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),
    textAlign:"center",

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  containerButtons:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

    [theme.fn.smallerThan('md')]: {
        flexDirection:"column"
      },
  }
}));

export default function HeroImageRight() {
  const { classes } = useStyles();
  const router =  useRouter();  

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Bienvenida a{" "}
              <Text
                component="span"
                inherit
                style={{color:"#FF66B3"}}
              >
                Juntas
              </Text>{'! '}
            </Title>

            <Text align='center' className={classes.description} mt={30}>
            Mayor seguridad, comodidad 
y confianza en cada viaje.
            </Text>
            <div className={classes.containerButtons}>
            <Button
              onClick={()=>router.push("/app/home")}
              style={{color:"#fff", backgroundColor:"#FF66B3", alignSelf:"center"}}
              size="xl"
              className={classes.control}
              mt={40}
            >
             Continuar
            </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}