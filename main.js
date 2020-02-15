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

const modal = document.getElementById("myModal");

function createSubcat(catName) {


    const section = document.querySelector("template.category").content;
    const sectionClone = section.cloneNode(true);

    sectionClone.querySelector("span").innerHTML = `${catName}`;
    sectionClone.querySelector(".SubCat").id = `${catName}`;

    document.querySelector(".menu").appendChild(sectionClone);


}

function createDish(data) {
    console.log(data);

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

    if (`${data.vegetarian}` == "true") {
        const img = document.createElement("img");
        img.src = "assets/vegan.svg"
        img.classList.add("vegan");
        clone.querySelector(".special").appendChild(img);
        clone.querySelector(".dish").classList.add("vege");
    }

    if (`${data.alcohol}` != 0) {
        // console.log("this is a vegetarian dish");
        const bottle = document.createElement("img");
        bottle.src = "assets/alcohol.svg"
        bottle.classList.add("alcohol");
        clone.querySelector(".special").appendChild(bottle);
                clone.querySelector(".dish").classList.add("containsAlcohol");

    }

    if (`${data.discount}` != 0) {
        const price = `${data.price}`;
        const discount = `${data.discount}`;
        const newPrice = price - discount + "DKK";
        clone.querySelector(".priceDiscount").textContent = newPrice;
        clone.querySelector(".price").classList.add("discounted");

    }

    if (`${data.soldout}` == "true"){
        clone.querySelector(".dishprez").classList.add("soldout");
        clone.querySelector(".priceDiscount").textContent = "Sold Out";
        clone.querySelector(".priceDiscount").style.fontWeight = "bold";

    }


    const button = clone.querySelector(".LearnMore");


    button.addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${button.id}`)
            .then(res => res.json())
            .then(fillModal);;
    });

    document.querySelector(`#${data.category}`).appendChild(clone);

    function fillModal(buttData) {
        modal.style.display = "block";

        const imageName = data.image; // this would be dynamic
        const base = "https://kea-alt-del.dk/t5/site/imgs/";
        const smallImg = base + "small/" + imageName + "-sm.jpg";
        const mediumImg = base + "medium/" + imageName + "-md.jpg";
        const largeImg = base + "large/" + imageName + ".jpg";


        document.querySelector(".dishprez-hover").src = `${largeImg}`;

        document.querySelector(".nameModal").textContent = `${buttData.name}`;
        document.querySelector(".longDesc").textContent = `${buttData.longdescription}`;
        document.querySelector(".priceModal").textContent = `${buttData.price}`;
        CheckSpecial(buttData);

    }
}

function CheckSpecial(buttData) {

    console.log(buttData);
    if (`${buttData.vegetarian}` == "true") {
        const veganHover = document.createElement("img");
        veganHover.src = "assets/vegan.svg"
        veganHover.classList.add("veganHover");
        document.querySelector(".special-hover").appendChild(veganHover);
    }

    if (`${buttData.alcohol}` != 0) {
        const bottleHover = document.createElement("img");
        bottleHover.src = "assets/alcohol.svg"
        bottleHover.id = "alcoholHover"
        bottleHover.classList.add("alcohol");
        document.querySelector(".special-hover").appendChild(bottleHover);;
    }


    if (`${buttData.allergens}`.length != 0) {
        const peanutHover = document.createElement("img");
        peanutHover.src = "assets/peanut.svg"
        peanutHover.id = "peanutHover"
        peanutHover.classList.add("peanutHover");
        document.querySelector(".special-hover").appendChild(peanutHover);;
    }

        if (`${buttData.discount}` != 0) {
        const priceHover = `${buttData.price}`;
        const discount = `${buttData.discount}`;
        const newPrice = priceHover - discount + "DKK";
        document.querySelector(".priceHoverDiscount").innerHTML = newPrice;
        document.querySelector(".priceHover").classList.add("discounted");

    }

    if (`${buttData.soldout}` == "true"){
        document.querySelector(".dishprez-hover").classList.add("soldout");
        document.querySelector(".priceHoverDiscount").textContent = "Sold Out";
        document.querySelector(".priceHoverDiscount").style.fontWeight = "bold";

    }

    endSpecial(buttData);
}

function endSpecial(buttData) {

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

            if (`${buttData.alcohol}` != 0) {
                document.querySelector("#alcoholHover").remove();
            }
            if (`${buttData.vegetarian}` == "true") {
                document.querySelector(".veganHover").remove();
            }
            if (`${buttData.allergens}`.length != 0) {
                document.querySelector(".peanutHover").remove();
            }

                    if (`${buttData.discount}` != 0) {
        document.querySelector(".priceHoverDiscount").innerHTML = " ";
        document.querySelector(".priceHover").classList.remove("discounted");

    }

    if (`${buttData.soldout}` == "true"){
        document.querySelector(".dishprez-hover").classList.remove("soldout");
        document.querySelector(".priceHoverDiscount").textContent = " ";

    }
        }

    }

}

//start of the filter


    const btnfilterVege = document.querySelector(".veganfilter");

    btnfilterVege.addEventListener("click", () => {

        const dish = document.querySelectorAll(".dish");
        console.log(dish);


        dish.forEach((e) => {
                 if (e.classList.contains("vege")){
            console.log("this is vege");
        } else {
            e.classList.toggle("hidden-vege");
            }
        })

            if (btnfilterVege.style.backgroundColor == "rgb(140, 59, 135)"){
            btnfilterVege.style.backgroundColor = "#40213E";}
            else {
               btnfilterVege.style.backgroundColor = "#8C3B87";
            }
    })

    const btnfilterAlc = document.querySelector(".alcoholfilter");

    btnfilterAlc.addEventListener("click", () => {

        const dish = document.querySelectorAll(".dish");
        console.log(dish);


        dish.forEach((e) => {
                 if (e.classList.contains("containsAlcohol")){
            console.log("this is booze");
        } else {
            e.classList.toggle("hidden-alcohol");
        }
        })

            if (btnfilterAlc.style.backgroundColor == "rgb(140, 59, 135)"){
            btnfilterAlc.style.backgroundColor = "#40213E";}
            else {
               btnfilterAlc.style.backgroundColor = "#8C3B87";
            }
    })

// starting the drop out
function startModal() {


    const tdd1 = document.querySelectorAll(".title-dd");

    tdd1.forEach((elem) => elem.addEventListener("click", dropDown, false));

    function dropDown(e) {

        var arrow = e.currentTarget.firstChild;

        e.currentTarget.nextElementSibling.classList.toggle("appear");
        arrow.classList.toggle("newRot");

    }
}
