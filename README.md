# User Management API Documentation

## Models

### User
The User model represents a user in the system. It includes the following fields:

- `userId`: (Number) Unique identifier for the user.
- `username`: (String) Username of the user.
- `fullName`: (String) Full name of the user.
- `age`: (Number) Age of the user.
- `email`: (String) Email address of the user.
- `isActive`: (Boolean) Indicates if the user is active.
- `hobbies`: (Array) List of hobbies.
- `address`: (Object) Address details of the user.
- `orders`: (Array of Orders) List of orders associated with the user.

### Order
Each order associated with a user is represented with the following fields:

- `orderId`: (Number) Unique identifier for the order.
- `items`: (Array) Items included in the order.
- `price`: (Number) Total price of the order.
- `status`: (String) Status of the order (e.g., "pending", "completed").

## Endpoints

### User Operations

#### 1. Create User
- **Method**: `POST`
- **Path**: `/users`
- **Description**: Creates a new user in the database.
- **Request Body**: User object.
- **Response**: Details of the created user.


### Order Operations

#### 6. Update Order
- **Method**: `PUT`
- **Path**: `/users/:userId/orders`
- **Description**: Adds or updates an order for a user.
- **Request Body**: Order object.
- **Response**: Updated order details.
