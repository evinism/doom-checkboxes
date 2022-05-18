import { Checkboxland } from "https://unpkg.com/checkboxland?module";
window.Checkboxland = Checkboxland;

const canvas = document.querySelector("#screen");
const canvas2 = document.querySelector("#screen2");
const video = document.querySelector("#doom-video");
const video2 = document.querySelector("#doom-video2");
const cbl = new Checkboxland({
  dimensions: "160x100",
  selector: "#checkboxes",
});
window.cbl = cbl;
cbl.print("DOOM WebAssembly loading..");

// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
// Looks like canvas.captureStream() doesn't work unless
//    you've already called canvas.getContext()
canvas.getContext("2d");
canvas2.getContext("2d");

setTimeout(() => (video.srcObject = canvas.captureStream()), 0);
setTimeout(() => (video2.srcObject = canvas2.captureStream()), 0);

document.body.onmousedown = () => {
  if (window.doomLoaded !== true) {
    return;
  }
  cbl.renderVideo(video2, { dithering: "atkinson" });
  video.play();
  video2.play();
};

const forwardKey = (e, type) => {
  const ev = new KeyboardEvent(type, {
    key: e.key,
    keyCode: e.keyCode,
  });
  canvas.dispatchEvent(ev);
};

document.body.addEventListener("keydown", function (e) {
  e.preventDefault();
  forwardKey(e, "keydown");
});

document.body.addEventListener("keyup", function (e) {
  e.preventDefault();
  forwardKey(e, "keyup");
});