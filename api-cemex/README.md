# API para página con Express

Para ejecutar el servidor de API, se tiene que crear un archivo con valores ambientales `.env` en el directorio.

Los valores que son _requeridos_ son los siguientes:

* `DB_USER=<string>` - Usuario del servidor de base de datos.
* `DB_PASSWORD=<string>`  - Contraseña del servidor de base de datos.
* `DB_SERVER=<string>` - Dirección del servidor de la base de datos.
* `DB_NAME=<string>` - Nombre de la base de datos.

Adicionalmente, los siguientes valores se pueden definir _opcionalmente_, de lo contrario se usarán valores por defecto:

* `PORT=<int>` - Puerto que escucha el servidor (*default:* 3001)
* `TOKEN_SECRET=<string>` -  Carácteres aleatorios utilizados para encriptar los tokens, mientras más largo mejor (*default:* se genera uno aleatoriamente, no es valido entre reinicios)
* `ACCESS_EXPIRATION=<int>` - Número de segundos hasta que el token de acceso expira (*default:* 1800)
* `REFRESH_EXPIRATION=<int>` - Número de segundos hasta que el token de refresh expira (*default:* 259200)
* `DB_MAX_POOL=<int>` - Número de conexiones máximas que se realizan al servidor de bases de datos simultáneamente (*default:* 3)
* `DB_MIN_POOL=<int>` - Número de conexiones mínimoas que se realizan al servidor de bases de datos simultáneamente (*default:* 0)
* `DB_POOL_TIMEOUT=<int>` - Número de milisegundos hasta que expira una conexión al servidor de base de datos (*default:* 10000)
