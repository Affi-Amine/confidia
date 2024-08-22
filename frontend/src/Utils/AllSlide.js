import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function slideDown(height, nameRef) {
  gsap.timeline().to(nameRef.current, {
    height: height,
    opacity: 1,
  });
}
export function slideUp(height, nameRef) {
  gsap.timeline().to(nameRef.current, {
    height: height,
    opacity: 0,
  });
}
export function slideLeft(idName) {
  const slider = document.getElementById(`${idName}`);
  slider.scrollLeft = slider.scrollLeft - 300;
}
export function slideRight(idName) {
  const slider = document.getElementById(`${idName}`);
  slider.scrollLeft = slider.scrollLeft + 300;
}

export function slideShowLeft(nameRef) {
  gsap.context(() => {
    gsap.timeline().fromTo(
      nameRef,
      {
        x: 0,
        opacity: 1,
      },
      {
        duration: 2,
        opacity: 0,
        x: -2000,
      }
    );
  }, nameRef.current);
}

export function slideShowRight(nameRef) {
  gsap.context(() => {
    gsap.timeline().fromTo(
      nameRef,
      {
        x: 3000,
        opacity: 0,
      },
      {
        duration: 2,
        opacity: 1,
        x: 0,
      }
    );
  }, nameRef.current);
}
