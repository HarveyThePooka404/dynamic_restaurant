fetch("getBanas.php")
  .then(e => e.json())
  .then(buildIt);

function buildIt(data) {
  console.log(data);
}
