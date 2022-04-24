import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const addField = document.querySelector<HTMLUListElement>("#add-field");
const addForm = document.getElementById("#add-form") as HTMLFormElement | null;
const addInput = document.querySelector<HTMLInputElement>("#add-title");

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

addForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (addInput?.value == "" || addInput?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: addInput.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  addInput.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  addField?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
