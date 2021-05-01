const getData = () => {
  return fetch("states.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
};

export default getData;