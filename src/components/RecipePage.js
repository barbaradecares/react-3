import React, { Component } from "react";
import RecipeItem from "./RecipeItem";
import { Redirect } from "react-router-dom";
import { getRecipesByIngredients } from "../services/recipes";
class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        thumbnail: "",
        title: "",
        ingredients: ""
      },
      similarRecipes: [],
      redirect: false
    };
  }

  componentDidMount() {
    if (!this.props.state) {
      this.setState({ redirect: true });
    } else {
      const recipe = this.props.state.recipe;
      this.setState({ recipe });
      getRecipesByIngredients(recipe.ingredients.split(", ").join(","))
        .then(similarRecipes => {
          this.setState({ similarRecipes: similarRecipes.slice(0, 4) });
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  render() {
    const { thumbnail, title, ingredients } = this.state.recipe;
    if (this.state.redirect) {
      return <Redirect to="/search" />;
    } else {
      return (
        <div>
          <img src={thumbnail} alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <strong>Ingredients: </strong>
              {ingredients}
            </p>
            <h5 className="card-title">Similar recipes</h5>
            <div className="row">
              {this.state.similarRecipes.map(recipe => (
                <RecipeItem recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default RecipePage;
