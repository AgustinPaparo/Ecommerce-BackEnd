<h1 style=' display:flex ; justify-content: center'>- PROYECTO FINAL - CURSO DE PROGRAMACIÓN BACKEND -</h1>

## <img align="right" alt="Coderhouse" height="75" width="150" src="https://concentrika.ucentral.edu.co/wp-content/uploads/2021/11/coderhouse-logo.png">

<br>




<h3 style='text-aling: justify'>El trabajo consta de una API-REST de una E-commerce creada con el objetivo de demostrar conocimientos aprendidos en el curso de Back-End de CoderHouse.
 Utiliza tecnologías como Express, Mongoose, Passport, entre otras, para proporcionar una plataforma de compras en línea segura y eficiente. Además, cuenta con un sistema de autenticación y autorización, y la integración de Nodemailer para el envío de correos electrónicos de confirmación de pedidos.</h3>


<br>

<br>
<br>


<hr>
<h1 style=' display:flex ; justify-content: center'> MÉTODOS</h1>

## USERS

| Metodo | Ruta          | Descripción                                                                                                                               |
| :----- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /login        | Permite iniciar sesión con un usuario previamente registrado. Verificación por passport. Ej:{"mail": "prueba","password": 123123} |
| GET    | /login        | Renderiza la pagina del front-end. Si tenes una sesion activa te redirecciona                                                             |
| GET    | /error-login  | Renderiza la pagina del front-end con el error del logueo                                                                                 |
| GET    | /logout       | Cierra sesion y limpia el carrito                                                                                                         |
| POST   | /signup       | Permite registrar un nuevo usuario                                                                                                        |
| GET    | /signup       | Renderiza el front-end y te permite cargar los datos de tu nuevo usuario                                                                  |
| GET    | /error-signup | Renderiza el front-end con el error de registro                                                                                           |
| GET    | /users        | Devuelve todos los usuarios de la base de datos.                                                                                          |
| PUT    | /users/:mail  | Devuelve un usuario según el mail especificado por parametro.                                                                             |
| DELETE | /users/:mail  | Elimina un usuario según el mail especificado por parametro.                                                                              |

<br>

## PRODUCTS

| Metodo | Ruta           | Descripción                                                                                                                               |
| :----- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /productos/    | Devuelve todos los productos que se encuentan en la base de datos.                                                                        |
| GET    | /productos/:id | Devuelve un producto según el ID especificado. **(es id no \_id)**                                                                        |
| POST   | /productos/    | Agrega un nuevo producto. Ej:{"nombre": "zapatilla","descripcion":"Calzado deportivo","foto": "zapatilla.jpg", "precio":60000, "stock":9} |
| PUT    | /productos/:id | Actualiza un producto según el ID especificado. Ej:{"descripcion":"Prenda para vestir","precio": 8000} **(es id no \_id)**                |
| DELETE | /productos/:id | Elimina un producto según el ID especificado en parametros. **(es id no \_id)**                                                           |

<br>

## CARTS

| Metodo | Ruta           | Descripción                                                                                                             |
| :----- | :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| GET    | /shop/:userid  | Devuelve el detalle del carrito perteneciente al id del usuario pasado por uri.                                         |
| DELETE | /shop/:userid  | Elimina un producto del carrito correspondiente al usuario. Hay que pasarle por el body el id del producto Ej:{"id":4}. |
| DELETE | /shop/clear    | Vacía el carrito perteneciente la sesión activa. Hay que pasarle el ID del user por el body Ej:{"id":5}                 |
| PUT    | /shop/:userid  | Agrega un producto al carrito del usuario. Solo es necesario pasarle el ID del producto Ej:{"id":4}.                    |
| GET    | /shop/checkout | Confirma un pedido con todos los productos que contiene el carrito del usuario.                                         |

<br>
<br>
<hr>



[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/agustin-paparo/)

### 👩‍💻 Profesor del curso - [Marcos Villanueva](https://github.com/marcosvillanueva9)