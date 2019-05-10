import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";
import { getRecipesByName } from "../services/recipes";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], page: 1 };
  }

  fetchRecipes = page => {
    getRecipesByName(this.props.searchString, page)
      .then(recipes => {
        this.setState({ recipes });
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    this.fetchRecipes(this.state.page);
  }

  updatePage = (page, direction) => {
    switch (direction) {
      case "next":
        let newPage = page + 1;
        this.setState({ page: newPage });
        this.fetchRecipes(newPage);
        break;

      case "previous":
        page <= 1 ? (newPage = page) : (newPage = page - 1);
        this.setState({ page: newPage });
        this.fetchRecipes(newPage);
        break;
    }
  };
  render() {
    return (
      <div>
        <div className="row">
          {this.state.recipes.map((recipe, index) => (
            <RecipeItem key={index} recipe={recipe} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  id="prev"
                  className="page-link"
                  href="#"
                  onClick={() => this.updatePage(this.state.page, "previous")}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  id="next"
                  className="page-link"
                  href="#"
                  onClick={() => this.updatePage(this.state.page, "next")}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};
export default Home;
