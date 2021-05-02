import { React } from 'react';
import {Image} from 'react-bootstrap';
import './Home.css';

function Home() {
  
    return (
    <body class="casa">
      
      <div class="over-home">
      <h1 class="welcom-mesge">Bienvenido de vuelta <span class="user-name">Alex</span></h1>
        <ul class="home-content">



           <li class= "user-info-home">
           <h1 id="card-tittles">Tasks:</h1>
           <p class="to-do">
            <Image class="user-info-image" src="/img/giphy.png" alt="user-info-image"/>
             </p>
             <p class="to-do">Tareas pendientes: 2, regresa a trabajar y recibe una recompensa.
             </p>
             <p id="card-tittles">
               Sucesos Recientes:
             </p>
             <p class="done">
             <Image class="user-info-image" src="/img/cheering.png" alt="user-info-image"/>
             </p>
             <p class="done">
             Felicidades, terminaste la Historia: "Realizar pruebas de calidad en Firebase"
             </p>
             <p class="done">
             <Image class="user-info-image" src="/img/cheering.png" alt="user-info-image"/>
             </p>
             <p class="done">
             Felicidades, terminaste la Tarea: "Fire Cloud API, implementación en CemexGo"
             </p>
           </li>



           <li class="noticias-info-home">
             <h1 id="card-tittles">NotiCemex</h1>
             <p> 
             <a href="https://www.cemexmexico.com/" target="_blank" rel="noreferrer">
             <img id="news"src="/img/cemextec2020.png" alt="noti"/>  
             </a>  
             </p>
             
          </li>



        </ul>
      </div>
      </body>
    );
}


export default Home;
