import React from "react";

function Slider(props) {
    return (
        <div className="Slider">
            <h4>
                <label for="customRange1" class="form-label">{props.text}</label>
            </h4>

            <input type="range" class="form-range" min="0" max="100" step="1" id="customRange1" />

        </div>
    );
}

export default Slider;