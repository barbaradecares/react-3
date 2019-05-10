const API_PATH = "http://localhost:3030/api";

const getRecipesByIngredients = (ingredients, page = 1) => {
  let completePath = API_PATH + `?i=${ingredients}&p=${page}`;
  return fetch(completePath)
    .then(response => response.json())
    .then(data => data.results);
};

const getRecipesByName = (name = "", page = 1) => {
  let completePath = API_PATH + `?q=${name}&p=${page}`;
  return fetch(completePath)
    .then(response => response.json())
    .then(data => data.results);
};

export { getRecipesByIngredients, getRecipesByName };
