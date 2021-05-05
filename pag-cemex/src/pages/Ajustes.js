import './Ajustes.css';
import Slider from './Slider.js';
//import Flex from './flex.js';
import { VscSettingsGear } from "react-icons/vsc";


function Ajustes() {
  return (
    <div class="settings">
      <h1 class="main-title"><VscSettingsGear /> Ajustes</h1>

      <ul className="opciones">
        <Slider text="Música" />
        <Slider text="Sonido" />
        <li class="titles"> Pantalla Completa </li>
        <button class= "boton" type = "button">Sí</button> <button class= "boton" type = "button">No</button>
        <li class="titles"> Guardar Cambios </li>
        <button class= "boton" type = "button">Sí</button> <button class= "boton" type = "button">No</button>
      </ul>


    </div>
  );
}

export default Ajustes;
