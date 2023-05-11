const btn = document.querySelector(".j-btn-test");
const icon1 = document.querySelector(".btn_icon-1");
const icon2 = document.querySelector(".btn_icon-2");

icon1.style.display = "none";

btn.addEventListener("click", () => {
  if (icon1.style.display == "none") {
    icon2.style.display = "none";
    icon1.style.display = "";
  } else {
    icon2.style.display = "";
    icon1.style.display = "none";
  }
});
