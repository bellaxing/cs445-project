window.onload = function () {
  document.getElementById("btn").onclick = function () {
    let input = +document.getElementById("input").value;
    usersList(input);
  };
};
const { from } = rxjs;
const { filter, map } = rxjs.operators;

 