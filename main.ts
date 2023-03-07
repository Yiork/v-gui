import "./style.css";
import { gsap, Power3 } from "gsap";
import axios from "axios";

let btn = document.querySelector(".v-btn") as HTMLButtonElement,
  submit = document.querySelector(".v-box-search") as HTMLFormElement,
  status = document.querySelector(".v-box-status") as HTMLDivElement,
  answer = document.querySelector(".v-box-answer") as HTMLDivElement,
  doc = document.querySelector(".v-box-doc") as HTMLDivElement,
  tl = gsap.timeline({ paused: true, reversed: true });

tl.to(".v-box", { right: -10, ease: Power3.easeOut, duration: 1 }, "-=1");

btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (tl.reversed()) {
    tl.play();
    btn.classList.add("active");
  } else {
    tl.reverse();
    btn.classList.remove("active");
  }
});

submit.addEventListener("submit", function (event) {
  event.preventDefault();
  const question = (event.target as HTMLFormElement)["v-box-input"].value;
  const formData = new FormData();
  formData.append("question", question);

  status.innerHTML = "loading";

  axios
    .post("http://localhost:5000/ai/answer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      status.innerHTML = "";
      answer.innerHTML = res.data.response;
      doc.innerHTML = res.data.context;
    })
    .catch((err) => {
      status.innerHTML = "";
      answer.innerHTML = "";
      doc.innerHTML = "";
      console.warn(err);
    });

  (event.target as HTMLFormElement).reset();
});
