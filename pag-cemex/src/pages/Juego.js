import {React} from "react";
import Card from "./card.js"
import "./Juego.css"
import "./card.css";

function Juego() {
    return (
        <body class="parent">
        <div class="content">
        <Card class="leftHub">
            <Card class="HubBox">
                <Card class={"instruccionesBox"}><h2>Instrucciones</h2></Card>
                <Card class={"instrucciones"}>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                </Card>
            </Card>
        </Card>

        <Card class="unityScreen">
            <img class="picJuego" src="/img/lifeh.png" alt="imagen juego"/>
        </Card>

        <Card class="rightHub">
            <Card class="HubBox">

                <h2>Leaderboard</h2>
                <ol class="leaderBoard">

                    <Card class={"listItem"}><li> SAM</li></Card>
                    <Card class={"listItem"}><li> SAM</li></Card>
                    <Card class={"listItem"}><li> SAM</li></Card>
                    <Card class={"listItem"}><li> SAM</li></Card>
                    <Card class={"listItem"}><li> SAM</li></Card>
                </ol>

                <h2>Logros</h2>
                <ul>
                    <Card class={"listItemL"}><li> Prueba</li></Card>
                    <Card class={"listItemL"}><li> Prueba</li></Card>
                    <Card class={"listItemL"}><li> Prueba</li></Card>
                    <Card class={"listItemL"}><li> Prueba</li></Card>
                </ul>
            </Card>
        </Card>
        </div>
        </body>
    );
}

export default Juego;