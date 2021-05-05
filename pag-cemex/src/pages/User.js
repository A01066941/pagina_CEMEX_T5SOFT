import React from "react";
import './User.css';

function User(){
    return(
    <div class="main-user"> 
        <ul class="topper">
        <span id="page-title">Perfil de usuario</span>
       
        <img class="foto-usuario" src="https://definicion.de/wp-content/uploads/2019/06/perfildeusuario.jpg"alt="img1"/>
        
        </ul>
        <ul class="contents-list">
        <li class="lista">
        <p class="medio">Nombre:    Juan Perez </p>
        <p class="medio1">Edad:     31 </p>
        <p class="medio2">Años en la empresa:   2 </p>
        <p class="medio3">Puesto: Administrador de la red </p>
        </li>

        <li class="lista">
        <p class="derecha">Departamento:    Area de IT </p>
        <p class="derecha1">Logros:     Llega al nivel 20</p>
        <p class="derecha2">Ultimo Logro:   Llega al nivel 20</p>
        <p class="derecha3">Proximo Logro:  Llega al nivel 25</p>
        <p class="derecha4">Puntos de ayuda:</p>
        </li>

        <li class="lista">
        <p class="izquierda">Medallas: Oro por terminar el nivel 20</p>
        <p class="izquierda1">Puntos: 1350 de 1500 </p>
        </li>
        </ul>
        
    </div>
    
    );
}
export default User;