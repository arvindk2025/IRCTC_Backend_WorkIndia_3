# IRCTC_API WorkIndia_Assignment
---

## Features That I have implemented according to the given task

Task-1) **User Registration**
   - Users can register with a name, email, and password.
   - The password is securely hashed using `bcrypt`.

Task-2) **JWT-based Authentication**
   - Users log in with their credentials, and a JWT token is issued for secure access to protected routes.
   - The token must be included in the `Authorization` header (Bearer Token) for any protected actions like booking trains, adding trains, etc.

Task-3) ** Get Seat Availability**
   - Users can search for trains between a source and destination.
   - Trains with available seats are displayed, along with their details.

Task-4) **Book Train Seats with Race Condition Handling**
   - Users can book seats on available trains.
   - The system handles potential race conditions by ensuring that seat availability is updated atomically, preventing overbooking.

Task-5) **Admin Functionalities ( Add New Train & Update Seat availability**
   - Admins can add new trains, including the total number of seats.
   - Admins can update seat availability for existing trains.
   - Only admins have access to routes that modify train data.

Task-6) **Get Booking Details**
   - Users can retrieve their booking details.
   - The API returns information on the booked train, including the source, destination, and number of seats booked.

Task-7) **Error Handling and Input Validation**
   - All API requests are validated for correct input.
   - Descriptive error messages are returned when invalid or incomplete data is provided.
   - Graceful handling of edge cases such as unavailable seats or missing fields.

---

## Project Setup

### Requirement

To run this project, ensure you have following installed:

1) Node.js
2) MySQL
3) Postman



### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/arvindk2025/IRCTC_Backend_WorkIndia.git
   cd IRCTC_Backend_WorkIndia
   ```

2. You need to create a `.env` file in the root of your project with the following environment variables:

``` bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
JWT_SECRET=your_own_jwt_secret
API_KEY=your_own_choice_admin_api_key
```
   
   
3. Install all necessary dependencies using npm:
   
   ```bash
    npm install
   ```
4. Set up your MySQL database:
  * Create a MySQL database named irctc_db.

 For Example:
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

SELECT * FROM users;
SELECT * FROM trains;

```

### Starting the Server
Once the setup is complete, start the server using npm:

```bash
npm start

```

--- 

# All => API Endpoints for API Testing in Postman 
## You can access the API at http://localhost:3000.

## API Routes 
    1). For SignUp new user 
       * HTTP Method :- POST
       * API Endpoint :- http://localhost:3000/user/register
       * Request Body:
       
``` bash
       {
  "name": "arvind_kumar_2",
  "email": "arvind_kumar_2@gmail.com",
  "password": "your_own_paswword"
      }

```
    2). Login
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/login
       * Request Body:
       
``` bash
    {
  "email": "arvind_kumar_2@gmail.com",
  "password": "your_own_paswword"
    }
 ```


    3. For Checking Seat availability
       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/availability?source=Banglore&destination=Hyderabad
       * Query Parameters
          * source: Source station (e.g., "Banglore")
          * destination: Destination station (e.g., "Hyderabad")
          * Request Body: Not needed 
       * Response:
``` bash
{
    "available": true,
    "availableTrainCount": 1,
    "trains": [
        {
            "trainNumber": "12345",
            "availableSeats": 120
        }
    ]
}

```

    4. For Booking Seats
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

#### Note :- Requires JWT authentication.

    5. For Getting Booking Details

       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/getAllbookings

       * Response:
  
    
```bash
[
    {
        "booking_id": 1,
        "number_of_seats": 50,
        "train_number": "1234",
        "source": "Banglore",
        "destination": "Hyderabad"
    }
]

```

### Admin Routes

    1.   Add a new train

       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/admin/addTrain
       * Request Body:
```bash
{
  "trainNumber": "12345",
  "source": "Banglore",
  "destination": "Hyderabad",
  "totalSeats": 400
}
```
       * Response:
    
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

    * Headers :
             * x-api-key: Your admin API key which is stored in .env file
```


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
        
    * Headers:
            * x-api-key:  Your admin API key which is stored in .env file
```


## Technologies Used

* Node.js: For backend 
* Express.js: Web framework for building the RESTful API
* MySQL: Database for storing Train, User, and Booking data
* JWT: For authentication and authorization
* bcrypt: For hashing the passwords
* dotenv: For managing environment variables


### Contributing
Feel free to fork the repository and make your contributions via pull requests. Any enhancements, bug fixes, or suggestions are welcome!




      

      


      









   
   













