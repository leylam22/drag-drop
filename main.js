const draggable = document.querySelectorAll(".task");
const droppable = document.querySelectorAll(".swim-lane");

draggable.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppable.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveBox(zone, e.clientY);
    const curBox = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curBox);
    } else {
      zone.insertBefore(curBox, bottomTask);
    }
  });
});

const insertAboveBox = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
