const container = document.querySelector("#container")
const grid_width = 16;
const grid_height = 16;

for(let i = 0; i < grid_height; i++) {
    const row_div = document.createElement("div");
    row_div.classList.add("row-div");

    for (let u = 0; u < grid_width; u++) {
        const div = document.createElement("div");
        div.classList.add("div");
        row_div.appendChild(div);
    }

    container.appendChild(row_div);
}