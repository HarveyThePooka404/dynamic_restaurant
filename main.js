window.addEventListener('DOMContentLoaded', (event) => {
    fetchCat("https://kea-alt-del.dk/t5/api/categories");
});

// this is fetching the data from the Google sheet

function fetchData(dataUrl) {
    fetch(dataUrl)
        .then(e => e.json())
        .then(buildIt);
}

// this is doing something with the Data

function buildIt(data) {
    data.forEach(createDish);
    startModal();
}

//
function fetchCat(dataCat) {
    fetch(dataCat)
        .then(e => e.json())
        .then(buildCat);
}

function buildCat(catName) {
    catName.forEach(createSubcat);
    fetchData("https://kea-alt-del.dk/t5/api/productlist");
}

function createSubcat(catName) {


    const section = document.querySelector("template.category").content;
    const sectionClone = section.cloneNode(true);

    sectionClone.querySelector("span").innerHTML = `${catName}`;
    sectionClone.querySelector(".SubCat").id = `${catName}`;

    document.querySelector(".menu").appendChild(sectionClone);


}

function createDish(data) {
    // console.log(data);

    // grabbing images from local storage
    const imageName = data.image; // this would be dynamic
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";



    const templateDish = document.querySelector(".dish--template").content;
    const clone = templateDish.cloneNode(true);

    clone.querySelector(".name").textContent = `${data.name}`;
    clone.querySelector(".dishprez").src = `${smallImg}`;
    clone.querySelector(".shortDesc").textContent = `${data.shortdescription}`;
    clone.querySelector(".price span").textContent = `${data.price}`;
    clone.querySelector("button").id = `${data.id}`;

    if(`${data.vegetarian}` == "true") {
       // console.log("this is a vegetarian dish");
        var img = document.createElement("img");
        img.src = "assets/vegan.svg"
        img.classList.add("vegan");
        clone.querySelector(".text-dish").appendChild(img);
        }

    const button = clone.querySelector(".LearnMore");


button.addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${button.id}`)
      .then(res => res.json())
      .then(fillModal);;
});

    document.querySelector(`#${data.category}`).appendChild(clone);



}

// starting the drop out & modal
function startModal() {


    const tdd1 = document.querySelectorAll(".title-dd");

    tdd1.forEach((elem) => elem.addEventListener("click", dropDown, false));

    function dropDown(e) {

        var arrow = e.currentTarget.firstChild;

        e.currentTarget.nextElementSibling.classList.toggle("appear");
        arrow.classList.toggle("newRot");

    }
}


// Get the modal

// Get the button that opens the modal
    const modal = document.getElementById("myModal");



function fillModal(buttData) {

    console.log("second mum")

    modal.style.display = "block";

    document.querySelector(".nameModal").textContent = `${buttData.name}`;
    document.querySelector(".longDesc").textContent = `${buttData.longdescription}`;
    document.querySelector(".priceModal").textContent = `${buttData.price}`;


}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


