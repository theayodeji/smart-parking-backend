### Outline of User Routes

api url - https://smart-parking-bspa.onrender.com

#### 1. **Fetch Parking Spaces**
   - **Route**: `GET /user/spaces`
   - **Description**: Fetches all parking spaces from the database.
   - **Required Parameters**: None
   - **Response**:
     - **Success** (`200 OK`):
       ```json
       [
         {
           "id": "spaceId1",
           "sensor": "PS4",
           "status": 0,
           "reserved": "false"
         },
         {
           "id": "spaceId2",
           "sensor": "PS5",
           "status": 1,
           "reserved": "true"
         }
       ]
       ```
     - **Error** (`500 Internal Server Error`):
       ```json
       {
         "message": "Error fetching data",
         "error": "Detailed error message"
       }
       ```

---

#### 2. **Reserve a Space**
   - **Route**: `POST /user/reserve-space/:id`
   - **Description**: Reserves a parking space by its ID.
   - **Required Parameters**:
     - `id` (Path Parameter): The ID of the parking space to reserve.
   - **Response**:
     - **Success** (`200 OK`):
       ```json
       {
         "message": "Space reserved successfully",
         "spaceId": "spaceId1"
       }
       ```
     - **Error** (`404 Not Found`):
       ```json
       {
         "message": "Space not found"
       }
       ```
     - **Error** (`400 Bad Request`):
       ```json
       {
         "message": "Space is already reserved"
       }
       ```

---

#### 3. **Cancel Reservation**
   - **Route**: `POST /user/cancel-reservation/:id`
   - **Description**: Cancels the reservation of a parking space by its ID.
   - **Required Parameters**:
     - `id` (Path Parameter): The ID of the parking space to cancel the reservation for.
   - **Response**:
     - **Success** (`200 OK`):
       ```json
       {
         "message": "Reservation canceled successfully",
         "spaceId": "spaceId1"
       }
       ```
     - **Error** (`404 Not Found`):
       ```json
       {
         "message": "Space not found"
       }
       ```
     - **Error** (`400 Bad Request`):
       ```json
       {
         "message": "Space is not reserved"
       }
       ```

---

Let me know if you need further details or adjustments!