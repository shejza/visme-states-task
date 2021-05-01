const getData = () => {
  //Get states from json file, returns promise
  return fetch("states.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export default getData;