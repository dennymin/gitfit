import React from 'react';
import { Container } from '@material-ui/core';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import NewWorkoutForm from './pages/new-workout';
import NewMealForm from './pages/new-meal';
import TempDrawer from './components/temp-drawer';
import YourWorkouts from './pages/your-workouts';
import YourMeals from './pages/your-meals';
import Register from './pages/register';
import SignIn from './pages/sign-in';
import Contacts from './pages/contacts';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import UserWorkouts from './pages/other-user-workouts';
import UserMeals from './pages/other-user-meals';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <SignIn />;
    }
    if (route.path === 'app/register') {
      return < Register/>;
    }
    if (route.path === 'app/home') {
      return (
        <>
          <TempDrawer />
          <Home />
        </>
      );
    }
    if (route.path === 'app/social') {
      return (
        <>
          <TempDrawer />
          <Contacts />
          </>
      );
    }
    if (route.path === 'app/your/workouts') {
      return (
        <>
          <TempDrawer />
          < YourWorkouts />
        </>
      );
    }
    if (route.path === 'app/your/meals') {
      return (
        <>
          <TempDrawer />
          <YourMeals />
        </>
      );
    }
    if (route.path === 'app/new/workout') {
      return (
        <>
          <TempDrawer />
          <NewWorkoutForm />
        </>
      );
    }
    if (route.path === 'app/new/meal') {
      return (
        <>
          <TempDrawer />
          <NewMealForm />
        </>
      );
    }
    if (route.path.includes('app/social/')) {
      const userId = route.path.split('/')[3];
      if (route.path.includes('workouts')) {
        return (
          <>
            <TempDrawer />
            <UserWorkouts userId={userId} />
          </>
        );
      } else if (route.path.includes('meals')) {
        return (
          <>
            <TempDrawer />
            <UserMeals userId={userId} />
          </>
        );
      }
    }
  }

  render() {
    const theme = createTheme({
      overrides: {
        MuiAccordion: {
          root: {
            backgroundColor: '#F0F5F9',
            width: '100%'
          }
        },
        MuiAccordionSummary: {
          root: {
            fontWeight: '500'
          }
        },
        MuiAccordionDetails: {
          root: {
            backgroundColor: 'white',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#C9D6DF',
              textDecoration: 'none'
            }
          }
        },
        MuiDrawer: {
          paper: {
            backgroundColor: '#C9D6DF'
          }
        },
        MuiDropzoneArea: {
          root: {
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: 160,
            border: '1px hidden',
            borderBottom: '1px solid #888484',
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            transition: '0.1s',
            '&:hover': {
              borderBottom: '2px solid black'
            }
          },
          textContainer: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'column'
          },
          text: {
            marginTop: 15,
            marginBottom: 5,
            fontSize: 'small',
            color: 'rgb(100, 100, 100)'
          },
          icon: {
            width: 70,
            height: 30,
            marginBottom: 0,
            color: 'rgb(100, 100, 100)'
          }
        },
        MuiDropzonePreviewList: {
          root: {
            display: 'flex',
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center'
          },
          imageContainer: {
            display: 'inline',
            padding: '4px !important'
          },
          image: {
            maxWidth: 80,
            maxHeight: 80,
            objectFit: 'cover',
            boxShadow: 'none',
            padding: 4,
            borderRadius: 5
          }
        },
        MuiDropzoneSnackbar: {
          successAlert: {
            display: 'none'
          }
        },
        MuiCard: {
          root: {
            width: '100%',
            border: '1px hidden',
            borderRadius: 10,
            paddingTop: 5,
            backgroundColor: 'white'
          }
        }
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <Container className='container-gutter'>
          { this.renderPage() }
        </Container>
      </ThemeProvider>
    );
  }
}
