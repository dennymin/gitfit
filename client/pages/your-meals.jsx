import { Grid, Card, CardContent, CardActions, Collapse, Typography, makeStyles, CardMedia } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Spinner from '../components/spinner';
import _ from 'lodash';

const useStyles = makeStyles(theme => {
  return {
    foodTitle: {
      textAlign: 'center',
      fontSize: '1.5rem',
      marginBottom: 15,
      fontStyle: 'italic',
      textDecoration: 'underline',
      fontWeight: 'bold'
    },
    cardCategoryHeader: {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      marginBottom: 3
    },
    cardCategoryContent: {
      fontStyle: 'italic',
      fontSize: '1.3rem',
      color: '#52616B'
    },
    detailsExpanded: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexGrow: 2
    },
    smallDetails: {
      fontSize: '0.8rem',
      color: 'rgb(150, 150, 150)',
      marginTop: 20,
      marginBottom: 7,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    gutterBottom: {
      marginBottom: 30
    }
  };
});

export default function YourMeals(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/your/meals';
    fetch(serverAddress, {
      headers: {
        'signin-token': window.localStorage.getItem('signin-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoaded(true);
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, []);

  const MealList = props => {
    const mealList = props.entries;
    const renderedMeals = mealList.map(meal => {
      const [expanded, setExpanded] = useState(false);
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      return (
        <Grid
          key={meal.mealId}
          item={true}
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
        >
          <Card
            className={classes.cardClass}
            raised={true}>

            <CardContent>
              <CardMedia
                className={classes.gutterBottom}
                component='img'
                image={meal.pictureUrl}
                title={`Picture of your ${meal.name}`}
              />
              <Typography
                className={classes.foodTitle}
                paragraph={true}
              >
                {_.startCase(meal.name)}
              </Typography>

              <Typography
                className={classes.cardCategoryHeader}
              >
                Calories:
              </Typography>
              <Typography
                className={classes.cardCategoryContent}
                paragraph={true}
              >
                {meal.calories} Calories
              </Typography>

              <CardActions className={classes.detailsExpanded}>
                <Typography
                  onClick={handleExpandClick}
                  className={classes.smallDetails}
                >
                  Expand for Ingredients, Nutrition, and Notes</Typography>
              </CardActions>
              <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
              >
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Ingredients:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                  paragraph={true}
                >
                  {meal.ingredients}
                </Typography>
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Nutrition:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                  paragraph={true}
                >
                  {meal.nutrition}
                </Typography>
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Notes:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                >
                  {meal.notes}
                </Typography>
              </Collapse>

            </CardContent>
          </Card>
        </Grid>
      );
    });
    return (
      <Grid
        spacing={4}
        container={true}
        justifyContent='flex-start'
      >
        {renderedMeals}
      </Grid>
    );
  };

  if (!loaded) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const Content = props => {
    if (serverData.length === 0) {
      return (
        <div className='center'>
          <Grid
            container
            justifyContent='center'
          >
            <Grid
              item
              xs={12}
              sm={10}
              md={10}
              lg={10}
              xl={10}
            >
              <Card raised={true}>
                <CardContent>
                  <Typography variant='h5' align='center' gutterBottom>
                    Nothing recorded yet!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <MealList entries={serverData} />
      );
    }
  };

  return (
    <>
      <Header title='YOUR MEALS' />
      <Content />
    </>
  );
}
