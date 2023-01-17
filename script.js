const container = document.querySelector("#container");
const resize_button = document.querySelector("#resize-button");
const reset_button = document.querySelector("#reset-button");

let grid_width = 64;
let grid_height = 64;

let mouse_down = false;
// track_mouse_down();
document.onmousedown = () => mouse_down = true;
document.onmouseup= () => mouse_down = false;


create_grid(grid_width, grid_height, container);

resize_button.addEventListener("click", function() {
    grid_width = prompt("What grid width you want?");
    grid_height = prompt("What grid height you want?");
    if (grid_width > 100 || isNaN(+grid_width)) grid_width = 100;
    if (grid_height > 100 || isNaN(+grid_height)) grid_height = 100
    create_grid(grid_width, grid_height, container);
})

// Clear grid
reset_button.addEventListener("click", function() {
    const divs = document.querySelectorAll(".div");
    divs.forEach(element => element.classList.remove("painted"));
})

function create_grid(width, height, container) {
    container.innerHTML = "";
    for(let i = 0; i < height; i++) {
        const row_div = document.createElement("div");
        row_div.classList.add("row-div");
    
        for (let u = 0; u < width; u++) {
            const div = document.createElement("div");
            div.classList.add("div");
            div.addEventListener("mouseover", function() {
                if (mouse_down) this.classList.add("painted");
            })
    
            row_div.appendChild(div);
        }

        container.appendChild(row_div);
    }
}

// function track_mouse_down() {
//     document.addEventListener("mousedown", () => mouse_down = true)
//     document.addEventListener("mouseup", () => mouse_down = false)
// }