const DEFAULT_BRUCH_COLOR = "#000000"
const DEFAULT_BACKGROUND_COLOR = "#ffffff"
const DEFAULT_GRID_SIZE = 16;

let brush_color = DEFAULT_BRUCH_COLOR;
let background_color = DEFAULT_BACKGROUND_COLOR;
let grid_size = DEFAULT_GRID_SIZE;
let mode = "drawing"
let grid = true;

const reset_button = document.querySelector("#reset-button");
const slider = document.querySelector("#slider");
const slider_label = document.querySelector("#slider-label");
const brush_picker = document.querySelector("#brushPicker");
const canvas_picker = document.querySelector("#canvasPicker");
const container = document.querySelector("#container");
const toggle_grid = document.querySelector("#toggle-grid");
const eraser_button = document.querySelector("#eraser-button");
const color_grab_button= document.querySelector("#color-grab-button");


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

brush_picker.addEventListener("change", change_brush_color);
canvas_picker.addEventListener("change", change_canvas_color);
reset_button.addEventListener("click", clear_grid);
toggle_grid.addEventListener("click", show_hide_grid);
eraser_button.addEventListener("click", change_mode);
color_grab_button.addEventListener("click", change_mode);

function create_grid(size) {
    if (size > 64) size = 64;
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
    if (mode == "drawing") e.target.style.backgroundColor = brush_color;
    if (mode == "erasing") e.target.style.backgroundColor = background_color;
    if (mode == "color-grabbing") {
        brush_color = e.target.style.backgroundColor;
        brush_picker.value = rgba2hex(brush_color);
        mode = "drawing";
        color_grab_button.classList.remove("active");
    }
}

function show_hide_grid() {
    const divs = document.querySelectorAll(".div");
    if(grid != true) {
        divs.forEach(div => div.classList.add("grid"));
        toggle_grid.classList.add("active");
        grid = true;
    } else {
        divs.forEach(div => div.classList.remove("grid"));
        toggle_grid.classList.remove("active");
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

function clear_grid() {
    const divs = document.querySelectorAll(".div");
    divs.forEach(element => element.style.backgroundColor = background_color);
}

function change_mode() {
    color_grab_button.classList.remove("active");
    eraser_button.classList.remove("active");
    if (this == eraser_button) {
        if (mode != "erasing") {
            mode = "erasing";
            this.classList.add("active")
        } else mode = "drawing";
    }
    if (this == color_grab_button) {
        if (mode != "color-grabbing") {
            mode = "color-grabbing";
            this.classList.add("active")
        } else mode = "drawing";
    }
}

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`