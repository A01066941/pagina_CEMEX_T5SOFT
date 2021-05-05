import React from "react";
import "./card.css";


function Card(props){
    const classes="card " + props.class;

    return (<div className={classes}>{props.children}</div>);
}

export default  Card;