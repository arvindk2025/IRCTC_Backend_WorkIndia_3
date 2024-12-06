# IRCTC API 

---

This project is a **Railway Management System** designed to simulate key functionalities of the IRCTC system. The system enables train seat bookings, checks for train availability, updates train details, and ensures role-based access for users and admins. The backend is built using **Node.js**, **Express.js**, and **MySQL**.

## Features

- User registration and login
- JWT-based authentication for secure access
- Check available trains between source and destination
- Book train seats with race condition handling
- Admin functionalities: add new trains, update seat availability, etc.
- Role-based access (admin/user)
- Error handling and input validation

---

## Project Setup

### Requirement

To run this project, ensure you have following installed:

- [Node.js]
- [MySQL]
- [Postman]



### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/ujjawalkumar131/IRCTC_API_WorkIndia.git
   cd irctc-railway-management
   ```

2. You need to create a `.env` file in the root of your project with the following environment variables:

``` bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
JWT_SECRET=your_jwt_secret
API_KEY=your_admin_api_key
```
   
   
3. Install all necessary dependencies using npm:
   
   ```bash
    npm install
   ```
4. Set up your MySQL database:
  * Create a MySQL database named irctc_db.

 Example:
 ``` bash
 CREATE DATABASE irctc_db;
USE irctc_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(50) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    seats INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### Starting the Server
Once the setup is complete, start the server using npm:

```bash
npm start

```
#### You can access the API at http://localhost:3000.

### API Endpoints

#### User Routes
    1. Register a new user
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/register
       * Body:
       
``` bash
       {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
      }

```

  2. Login
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/login
       * Body:
       
``` bash
    {
  "email": "john@example.com",
  "password": "password"
    }
 ```


  3. Check train availability
   
       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/availability?source=Ranchi&destination=Delhi
       * Query Parameters
          * source: Source station (e.g., "Ranchi")
          * destination: Destination station (e.g., "Delhi")
       * Response:
``` bash
{
  "available": true,
  "availableTrainCount": 1,
  "trains": [
    {
      "trainNumber": "123123",
      "availableSeats": 600
    }
  ]
}

```

 4. Book Seats
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/book
       * Request Body:
       
``` bash
  {
  "trainId": 1,
  "seatsToBook": 2
}

```
 * Response:

```bash
{
  "message": "Seats booked successfully"
}
```

Note :- Requires JWT authentication.

5.  Booking Details

       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/getAllbookings

       * Response:
  
    
```bash
[
    {
        "booking_id": 17,
        "number_of_seats": 50,
        "train_number": "123123",
        "source": "Ranchi",
        "destination": "Delhi"
    }
]


```

#### Admin Routes

1.   Add a new train

       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/admin/addTrain

       * Request Body:
  
    
```bash
{
    "message": "Trains added successfully",
    "trainIds": [
        {
            "trainNumber": "172622",
            "trainId": 21
        }
    ]
  }
```

         * Headers :
             * x-api-key: Your admin API key which is stored in .env


  2. Update seat availability

       * HTTP Method :- PUT
       * Endpoint :- http://localhost:3000/admin/update-seats/10
       * Request Body:
```bash
 {
  "totalSeats": 200,
  "availableSeats": 150
 }
```
       * Response:

       
```bash
{
  "message": "Seats updated successfully"
}
 ```
        * Headers:
            * x-api-key:  Your admin API key which is stored in .env 

### Running Tests

You can test all the available APIs using Postman. The endpoints are well-structured and follow RESTful conventions.

```bash
[
  {
    "trainNumber": "123123",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 300
  },
  {
    "trainNumber": "124124",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 350
  },
  {
    "trainNumber": "125125",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 400
  },
  {
    "trainNumber": "126126",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 500
  },
  {
    "trainNumber": "127127",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 600
  }
]
```

### Technologies Used

* Node.js: For backend logic
* Express.js: Web framework for building the RESTful API
* MySQL: Database for storing train, user, and booking data
* JWT: For authentication and authorization
* bcrypt: For hashing the passwords
* dotenv: For managing environment variables

### Future Enhancements
* Add frontend interface using React or Angular
* Implement seat selection
* Add email notifications for booking confirmations
* Integrate payment gateway

### Contributing
Feel free to fork the repository and make your contributions via pull requests. Any enhancements, bug fixes, or suggestions are welcome!




      

      


      









   
   













