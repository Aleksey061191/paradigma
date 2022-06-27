import "../src/css/style.scss";

const btnmodal = document.querySelector(".callLink");
const modal = document.querySelector(".overlay");

const active = (e) => {
  modal.classList.remove("overlay-close");
  modal.classList.add("overlay-open");
};
const inactive = (e) => {
  let classes = e.target.classList;
  if (classes.contains("overlay-open") || classes.contains("close-icon")) {
    modal.classList.remove("overlay-open");
    modal.classList.add("overlay-close");
  }
};

btnmodal.addEventListener("click", active);
window.addEventListener("click", inactive);

const input = document.querySelector(".modal__tel");
let keyCode;
function mask(event) {
  event.keyCode && (keyCode = event.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) event.preventDefault();
  let matrix = "+7 ( _ _ _) _ _ - _ _ - _ _",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    new_value = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = new_value.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    new_value = new_value.slice(0, i);
  }
  let reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = new_value;
  if (event.type == "blur" && this.value.length < 5) this.value = "";
}

function blur(event) {
  if (event.target.value.length < 6) {
    input.value = "";
  }
}

input.addEventListener("input", mask);
input.addEventListener("focus", mask);
input.addEventListener("blur", blur);
input.addEventListener("keydown", mask);

const submitBtn = document.querySelector(".modal__submit");
const checkbox = document.querySelector(".checkbox-input");

function checked(e) {
  if (e.target.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function submit(e) {
  e.preventDefault();
  const input = document.querySelector(".modal__tel");
  if (input.value.length == 27) {
    modal.classList.remove("overlay-open");
    modal.classList.add("overlay-close");
    alert("Заявка отправлена!");
    input.value = "";
    checkbox.checked = false;
    submitBtn.disabled = true;
  }
}

submitBtn.addEventListener("click", submit);
checkbox.addEventListener("change", checked);

const menuBtn = document.querySelector(".burger-btn");
const sideBar = document.querySelector(".header-menu");

menuBtn.addEventListener("click", (e) => {
  if (
    e.target &&
    (e.target.classList.contains("burger-btn") ||
      e.target.classList.contains("burger-btn__row"))
  ) {
    menuBtn.classList.toggle("burger-btn_active");
    sideBar.classList.toggle("header-menu_active");
  }
});

menuBtn.addEventListener("click", (e) => {
  if (
    !(
      e.target.classList.contains("burger-btn") ||
      e.target.classList.contains("burger-btn__row")
    )
  ) {
    menuBtn.classList.toggle("burger-btn_active");
    sideBar.classList.toggle("header-menu_active");
  }
});

const showBtn = document.querySelector(".showBtn");
const closeBtn = document.querySelector(".closeBtn");
const bullets = document.querySelector(".bullets");
const smallBullet = document.querySelector(".bullets-mobile");

showBtn.addEventListener("click", (e) => {
  bullets.classList.add("bullets-open");
  bullets.classList.remove("bullets-close");
  smallBullet.classList.add("bullets-mobile-close");
  smallBullet.classList.remove("bullets-mobile-open");
});

closeBtn.addEventListener("click", (e) => {
  bullets.classList.remove("bullets-open");
  bullets.classList.add("bullets-close");
  smallBullet.classList.remove("bullets-mobile-close");
  smallBullet.classList.add("bullets-mobile-open");
});
