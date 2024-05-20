<img src="https://i.ibb.co/ZhFSgrC/logo-black-pdf-generator.png" alt="logo-black-pdf-generator" border="0" width="300">
 
# Index

+ [Description](#description)
+ [Figma](#figma)
+ [Project Configuration](#project-configuration)
+ [Test](#test)
+ [Project Structure ](#project-structure)
+ [Technologies](#technologies)
+ [Authors](#authors)
+ [Contributions](#contributions)

# Description 

This is the final project of our web development bootcamp in Factoría F5, created in collaboration with Cohispania. Pdf Generator is a standalone application that allows users to generate and manage PDF document templates. The data structure provided to the library is in JSON format. Consequently, the application enables users to CREATE, EDIT, DELETE, and VIEW various JSON templates in a database. The application allows adding and configuring different modules in addition to the document itself. Last but not least, the application offers the option to download the PDF document.

# Figma
<a href="https://www.figma.com/design/fsnZrT7qmmAnIj6cZdWEGW/PDF-Generator?node-id=0%3A1&t=rgCzO5wngh4V8qbI-1" target="_blank"><img src="https://i.ibb.co/HVKSn8Z/figma-pdf-generator.png" alt="figma-pdf-generator" border="0"></a>
## Project Configuration

1. **Clone the Repository:**

* Copy code in your terminal:
  ```
  git clone https://github.com/elenalope/pdf-generator-cohispania.git
  ```

2. **Create the file __.env__**
   
* Create the file __.env__ located in the folder "Server"
* Copy the information placed on ´.env_example´ and fill it with your personal data


3. **Install Dependencies:** 

* Copy code in your terminal to enter in the repository back folder:
  ```
  cd server
  ```
* Copy code in your terminal:
  ```
  npm install

* Copy code to make the server run:
  ```
  npm run dev
  ```
  This will start the server __http://localhost:3000__ using the database on Mongo DB.


  
* Copy code in your terminal to enter in the repository front folder:
  ```
  cd client
  ```
* Copy code in your terminal:
  ```
  npm install
  ```
* Copy code to make the server run:
  ```
  npm run dev
  ```

## Test

* Copy code in your terminal to enter in the repository front folder:
  ```
  cd client

* Copy code:
  ```
  npm run test
  ```
This will run the front tests.
<br><br>
<img src="https://i.ibb.co/YpkJC3T/test-front-pdf-generator.png" alt="test-front-pdf-generator" border="0">

* Copy code in your terminal to enter in the repository back folder:
  ```
  cd server

* Copy code:
  ```
  npm run test
  ```
This will run the back tests.
<br><br>
<img src="https://i.ibb.co/b75GPYw/test-back-pdf-generator.png" alt="test-back-pdf-generator" border="0">

## Project Structure 

 __CLIENT__ 
* __node_modules:__ contains all the dependencies of your project. When you install packages using npm, they are stored here.
* __server:__ contains the db.json with the api fake.
* __src:__
    * __assets:__ all the images.
    * __components:__ It contains all the reusable components of the page, organized in folders with their code and styles.
    * __context:__ This code sets up an authentication context in React and provides a hook for accessing authentication data in functional components.
    * __layout:__ It features two main layouts: `LayoutPublic` and `LayoutDocument`, responsible for defining the data interface structure for the pages.
    * __pages:__ All the pages of the web.
    * __router:__ route definitions for the methods of the API.
    * __services:__ all the methods of the crud of the diferent componentes.
    * __test:__ unit and integration tests in one file.
    * __index.css:__ contains the styles.
    * __main.jsx:__ This code sets up the rendering of the React application.
* __.gitignore:__  specifies files and folders ignored by Git to prevent irrelevant or automatically generated files from being tracked.
* __index.html:__
* __package.json and package-lock.json:__ these files contain metadata about your project and its dependencies. They also include scripts for running various tasks like starting the development server or building the production bundle.
* __vite.config.js:__ This Vite configuration file defines the use of the React plugin with SWC for the fast compilation of React projects and sets up a testing environment using jsdom with support for global variables.
      

 __SERVER__ 
* __controllers:__ to handle HTTP requests.
* __database:__ configuration of connections with the database.
* __models__: the model of database.
* __node_modules:__ contains all the dependencies of your project. When you install packages using npm, they are stored here.
* __routes:__ routes definitions for the methods of the API.
* __test:__ unit and integration tests in one file.
* __.env:__ is a configuration file commonly used to store environment variables.
* __.gitignore:__  specifies files and folders ignored by Git to prevent irrelevant or automatically generated files from being tracked.
* __app.js:__ entry point of the application.
* __config.js:__ application configuration, such as database and server configuration.
* __package.json and package-lock.json:__ these files contain metadata about your project and its dependencies. They also include scripts for running various tasks like starting the development server or building the production bundle.

  
__README.md:__ this file typically contains instructions on how to set up and run your project, as well as any other relevant information for contributors or users.

# Technologies

<img width="50" src="https://cdn.worldvectorlogo.com/logos/trello.svg">&nbsp;
<img width="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png">&nbsp;
<img width="50" src="https://seeklogo.com/images/H/html5-without-wordmark-color-logo-14D252D878-seeklogo.com.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png">&nbsp;
<img width="50" src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_wordmark_logo_icon_146425.png" >&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" >&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png">&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg">&nbsp;
<img width="50" src="https://media.licdn.com/dms/image/C560BAQHQH8_cFFK_3A/company-logo_200_200/0/1630606810347/drawsql_logo?e=2147483647&v=beta&t=aWOh8DYdF-g2BWxZPlX4b3vXC2Omo0TOSxqO0JHKvws">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png">&nbsp;
<img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png">&nbsp;
<img width="50" src="https://cdn.worldvectorlogo.com/logos/nodemon.svg">&nbsp;
<img width="50" src="https://express-validator.github.io/img/logo.svg">&nbsp;
<img width="50" src="https://static-00.iconduck.com/assets.00/sequelize-original-icon-885x1024-r8dswyvj.png">&nbsp;
<img width="50" src="https://seeklogo.com/images/M/mui-logo-56F171E991-seeklogo.com.png">&nbsp;

# Authors

| [<img src="https://media.licdn.com/dms/image/D4D03AQEJ3KGYFuEU3A/profile-displayphoto-shrink_800_800/0/1709049958070?e=1721865600&v=beta&t=fwIpM_f3p-ijMLqIiYz-vAjbHxqDGjkTQE61VhIGllE" width=115><br><sub>Fátima Capilla</sub>](https://github.com/FatimaCapilla) |  [<img src="https://media.licdn.com/dms/image/D4E03AQGn5w55dlVPuA/profile-displayphoto-shrink_800_800/0/1706047184665?e=1721865600&v=beta&t=v_dhV8ODZVTlM0eXawfPbrfBCaUwsA5xC0t-SqTgsq4" width=115><br><sub>Beatriz Mercado</sub>](https://github.com/BeatrizMercado) |  [<img src="https://media.licdn.com/dms/image/D4D03AQErXoTUInMePQ/profile-displayphoto-shrink_800_800/0/1709158064701?e=1721865600&v=beta&t=hfdhllc7b91VFmM1pLp0HdQULZAzd_YjhaHslxJKp0w" width=115><br><sub>Nhoeli Salazar</sub>](https://github.com/Nho89) | [<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width=115><br><sub>Elena López</sub>](https://github.com/elenalope) |  [<img src="https://media.licdn.com/dms/image/D4D03AQG1ojHQODUQiA/profile-displayphoto-shrink_800_800/0/1705241527957?e=1721865600&v=beta&t=vhFar15KUm5lRI41wGNZ-MxtMHUOQmzI5Go0vd3RKh8" width=115><br><sub>Rebeca Vicente</sub>](https://github.com/rebecavm28) |
| :---: | :---: | :---: |:---: | :---: |

# Contributions
Contributions are welcome! If you find any problems or have suggestions for improvement, please create an issue or make a pull request.
   
**[⬆️ Back to Index](#index)**
