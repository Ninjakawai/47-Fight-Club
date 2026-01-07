const divoverlay = document.createElement('div');         //creer une div
const divcontent = document.createElement('div');
const divh2 = document.createElement('h2');
const button = document.createElement('button');
const style = document.createElement('style');

document.head.appendChild(style);                         // créer une balise style dans le HEAD
document.body.appendChild(divoverlay);                    //insere la div dans le body
divoverlay.appendChild(divcontent);                       //insere la div dans la constante 
divcontent.appendChild(divh2);
divcontent.appendChild(button);

divoverlay.classList.add("overlaypopup");                 // ajoute une class a un element
divcontent.classList.add("contentpopup");
divh2.setAttribute("id","h2popup");                       // ajouter un id a un element

style.innerHTML =" @media screen and (max-width: 900px) {.contentpopup " +
"{width:100% !important; max-width: fit-content !important;} #h2popup {font-size:3rem !important;}" + 
".overlaypopup{align-items: start !important;}}";
divh2.innerHTML = "Arrête de scroller, viens t'entrainer";
button.textContent ="X";

//insertion de css
Object.assign(divoverlay.style, {
    position: "fixed",
    top : "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
    PointerEvents: "none"

});

Object.assign(divcontent.style,{
    minWidth: "45%",
    maxWidth: "45%",
    minHeight: "200px",
    padding: "40px",
    backgroundImage: "url(../img/istockphoto-1177188061-612x612.jpg)",
    borderRadius: "20px",
    position : "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent:"center"
    
});

Object.assign(divh2.style,{
    display: "flex",
    fontSize: "5rem",
    color: "white",
    textShadow: "1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black",
    justifyContent: "center",
    alignItems:"center",
    margin: "0",
    padding: "0",
    textAlign: "center"
    
});

Object.assign(button.style,{
    border: "0px",
    backgroundColor: "transparent",
    color:"rgb(255, 255, 255)",
    fontSize: "1.5",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0px",
    right: "0px",
    cursor: "pointer"

})


//fonction d'ouverture et fermeture du popin
function openPopup(){
    divoverlay.style.display = "flex"
}

function closePopup(){
    divoverlay.style.display = 'none';
}

button.addEventListener("click", closePopup);

setTimeout(openPopup, 600000); //10 minutes