import React, { Component } from 'react';
import axios from 'axios';
import './Recipes.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Recipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes:[],
      selectedIndex: 0
    };
    this._ToggleNext = this._ToggleNext.bind(this);
    this._TogglePrev = this._TogglePrev.bind(this);
  }

  componentDidMount(){  
    // axios.get(process.env.REACT_APP_BACKEND_URL+"/v1/allrecipes")
      axios.get("http://a795265c1b7bc4451abb0d259e24cf93-731820842.us-east-1.elb.amazonaws.com:8080/v1/allrecipes")
      .then((response) => {
          console.log(response)
        this.setState({recipes: response.data,
                       selectedIndex: 0 
        });
        console.log("hello"+ response.data)
      })
      .catch(error => {
        this.setState(error)
        console.log(error)
      });
  }
 
  _ToggleNext(){
    console.log("Next clicked");
    let {recipes, selectedIndex} = this.state;
    var max = recipes.length;
    
    if(selectedIndex === max-1)
      return;

    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex+1
    }))
    
    console.log(this.state.selectedIndex)
  }

  _TogglePrev(){
    console.log("Previous clicked");
    let {selectedIndex} = this.state;

    if(selectedIndex === 0)
      return;
    
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex-1
    }))

    console.log(this.state.selectedIndex)
  }

  
  render() {
    let { recipes, selectedIndex, error } = this.state;

    console.log("Render" +recipes)
    if(error){
      return <div><h1>Something went wrong</h1></div>
    } else if(recipes.length > 0) {
      return (
        <Card className="card">
        <CardActionArea>
        <CardContent>
        <div>
            <Typography gutterBottom variant="h5" component="h2">{recipes[selectedIndex].title}</Typography>
              <div><small><i>Posted on: {recipes[selectedIndex].createdts}</i></small></div>
              <div><small><i>Last Updated on: {recipes[selectedIndex].updated_ts}</i></small></div>
              <div>
              <Typography variant="body1" color="textSecondary" component="p"><p><b>Cuisine:</b> {recipes[selectedIndex].cuisine}</p></Typography>
              <Typography variant="body1" color="textSecondary" component="p"><p><b>Preparation Time:</b> {recipes[selectedIndex].prep_time_in_min} minutes</p></Typography>
              <Typography variant="body1" color="textSecondary" component="p"><p><b>Cooking Time:</b> {recipes[selectedIndex].cook_time_in_min} minutes</p></Typography>
              <Typography variant="body1" color="textSecondary" component="p"><p><b>No. of Servings:</b> {recipes[selectedIndex].servings}</p></Typography>

                  {/*<div><Typography variant="body1" color="textSecondary" component="p"><p><b>Ingredients:</b></p></Typography>*/}
                  {/*  */}
                  {/*    {*/}
                  {/*      recipes[selectedIndex].ingredients.map((ingredient) =>{*/}
                  {/*        return (<li>{ingredient}</li>);*/}
                  {/*      })*/}
                  {/*    }*/}
                  {/*</div>*/}
                  

                  {/*<div><Typography variant="body1" color="textSecondary" component="p"><p><b>Steps</b></p></Typography>*/}
                  
                  
                  {/*    {*/}
                  {/*      recipes[selectedIndex].steps.map((step) =>{*/}
                  {/*        return (<li>{step.items}</li>);*/}
                  {/*      })*/}
                  {/*    }*/}
                  {/*  </div>*/}
                    
                  </div><Typography variant="body1" color="textSecondary" component="p"><p><b>Nutrition</b></p></Typography>
                  <div>
                  <Typography variant="body1" color="textSecondary" component="p"><p><b>Calories:</b> {recipes[selectedIndex].nutritionInformation.calories}</p></Typography>
                  <Typography variant="body1" color="textSecondary" component="p"><p><b>Cholesterol:</b> {recipes[selectedIndex].nutritionInformation.cholesterol_in_mg} mg</p></Typography>
                  <Typography variant="body1" color="textSecondary" component="p"><p><b>Sodium:</b> {recipes[selectedIndex].nutritionInformation.sodium_in_mg} mg</p></Typography>
                  <Typography variant="body1" color="textSecondary" component="p"><p><b>Carbohydrates:</b> {recipes[selectedIndex].nutritionInformation.carbohydrates_in_grams} g</p></Typography>
                  <Typography variant="body1" color="textSecondary" component="p"><p><b>Proteins:</b> {recipes[selectedIndex].nutritionInformation.protein_in_grams} g</p></Typography>
                  </div><div>
                  </div>
              </div>
          
        
        <div>  
        <Button size="small" color="primary" onClick={this._TogglePrev}>Previous</Button>
        <Button size="small" color="primary" onClick={this._ToggleNext}>Next</Button>
        </div>
        </CardContent>
        </CardActionArea>
        </Card>
      )
    } else {
      return null;
    }
  }
}