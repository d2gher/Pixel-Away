const DEFAULT_BRUCH_COLOR = "#000000"
const DEFAULT_BACKGROUND_COLOR = "#ffffff"
const DEFAULT_GRID_SIZE = 16;

let brush_color = DEFAULT_BRUCH_COLOR;
let background_color = DEFAULT_BACKGROUND_COLOR;
let grid_size = DEFAULT_GRID_SIZE;
let grid = true;

// const container = document.querySelector("#container");
const reset_button = document.querySelector("#reset-button");
const slider = document.querySelector("#slider");
const slider_label = document.querySelector("#slider-label");
const brush_picker = document.querySelector("#brushPicker");
const canvas_picker = document.querySelector("#canvasPicker");
const container = document.querySelector("#container");
const toggle_grid = document.querySelector("#toggle-grid");


let mouse_down = false;
document.body.onmousedown = () => mouse_down = true;
document.body.onmouseup= () => mouse_down = false;

create_grid(grid_size, container);
slider.value = grid_size;
slider_label.textContent = `${grid_size} X ${grid_size}`
slider.addEventListener('input', function() {
    create_grid(this.value);
    update_slider_label(this.value);
})

brush_picker.addEventListener("change", change_brush_color)
canvas_picker.addEventListener("change", change_canvas_color)
reset_button.addEventListener("click", function() {
    const divs = document.querySelectorAll(".div");
    divs.forEach(element => element.style.backgroundColor = background_color);
})

toggle_grid.addEventListener("click", show_hide_grid)

function create_grid(size) {
    container.innerHTML = "";
    for(let i = 0; i < size; i++) {
        const row_div = document.createElement("div");
        row_div.classList.add("row-div");
    
        for (let u = 0; u < size; u++) {
            const div = document.createElement("div");
            div.classList.add("div");
            div.style.backgroundColor = background_color;
            if (grid) div.classList.add("grid");
            div.addEventListener("mouseover", change_color);
            div.addEventListener("mousedown", change_color);
            row_div.appendChild(div);
            
        }
        container.appendChild(row_div);
    }
}

function update_slider_label(size) {
    slider_label.textContent = `${size} X ${size}`
}

function change_color(e) {
    if (e.type == "mouseover" && !mouse_down) return;
    e.target.style.backgroundColor = brush_color;
}

function show_hide_grid() {
    const divs = document.querySelectorAll(".div");
    if(grid != true) {
        divs.forEach(div => div.classList.add("grid"))
        grid = true;
    } else {
        divs.forEach(div => div.classList.remove("grid"))
        grid = false;
    }
}

function change_brush_color() {
    brush_color = this.value
}

function change_canvas_color() {
    const divs = document.querySelectorAll(".div");
    divs.forEach((div) => {
        if(rgba2hex(div.style.backgroundColor) == background_color) {
            div.style.backgroundColor = this.value
        }
    })    
    background_color = this.value;
}

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`