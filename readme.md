# Location application with leaflet

<img src='https://upload.cc/i1/2023/03/28/5Hr41N.jpeg' alt='App preview' width='800px' />

### To run the application:

- Clone the repository to your local machine.
- Make sure Docker is installed and running on your system.
- Navigate to the root directory of the application in your terminal.
- Run the command `docker-compose up --build`. This will build and start the Docker containers needed to run the application.
- Once the application has loaded, open your browser and navigate to http://localhost:5173/.

Tools used:

- Mockaroo (https://www.mockaroo.com/) for generating a list of random names, latitudes, and longitudes to use in the application.
- Docker (https://www.docker.com/) for containerizing and running all necessary servers for the application.
- Node.js (https://nodejs.org/) with Express.js (https://expressjs.com/) for building the backend API and server for the application.
- MySQL (https://www.mysql.com/) for storing data related to the application.
- React.js (https://reactjs.org/) for developing the frontend user interface and components for the application.
- Leaflet (https://leafletjs.com/) as a mapping library to display and interact with geographical data in the application.
