import data from "./data.json" with { type: "json" };

let Pic = 0;

const photo = document.getElementById("pic");
const fragranceName = document.getElementById("fName");
const note = document.getElementById("notes");

function show(item) {
  photo.onload = () => {
    fragranceName.innerHTML = item.name;
    note.textContent = item.notes;
  };
  photo.src = item.src;
}

document.getElementById("pic").onclick = () => {
  if (Pic === data.products.length - 1) {
    Pic = 0;
  } else {
    Pic++;
  }
  show(data.products[Pic]);
};
