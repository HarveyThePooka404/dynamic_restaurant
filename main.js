fetch("https://kea-alt-del.dk/t5/api/productlist    ")
  .then(e => e.json())
  .then(buildIt);

function buildIt(data) {
  console.log(data);
}

// this is fetching the data from the Google sheet //

