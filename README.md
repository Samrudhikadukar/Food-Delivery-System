# Zosh Food

1. **User:**
    - ID (Auto-generated)
    - Username
    - Password
    - Email
    - Phone Number
    - Address
    - Role (Customer or Restaurant Owner)
    - Registration Date
    - Last Login Date
2. **Restaurant:**
    - ID (Auto-generated)
    - Name
    - Description
    - Cuisine Type
    - Address
    - Contact Information
    - Opening Hours
    - Ratings
    - Image URL
    - Registration Date
3. **Menu Item:**
    - ID (Auto-generated)
    - Name
    - Description
    - Price
    - Category
    - Image URL
    - Availability Status
    - Restaurant (reference to Restaurant entity)
    - Creation Date
4. **Order:**
    - ID (Auto-generated)
    - Customer (reference to User entity)
    - Restaurant (reference to Restaurant entity)
    - Total Amount
    - Order Status
    - Timestamp
    - Delivery Address
    - Items (list of Order Items)
    - Payment (reference to Payment entity, if applicable)
5. **Order Item:**
    - ID (Auto-generated)
    - Menu Item (reference to Menu Item entity)
    - Quantity
    - Subtotal
    - Order (reference to Order entity)
6. **Payment:**
    - ID (Auto-generated)
    - Order (reference to Order entity)
    - Payment Method
    - Payment Status
    - Total Amount
    - Payment Timestamp
7. **~~Delivery Executive:~~**
    - ~~ID (Auto-generated)~~
    - ~~Name~~
    - ~~Contact Information~~
    - ~~Availability Status~~
    - ~~Current Location (Latitude and Longitude)~~
8. **Review/Rating:**
    - ID (Auto-generated)
    - Customer (reference to User entity)
    - Restaurant (reference to Restaurant entity)
    - Rating
    - Review Text
    - Timestamp
9. **Promotion/Coupon:**
    - ID (Auto-generated)
    - Code
    - Discount Amount
    - Validity Period
    - Terms and Conditions
10. **Notification:**
    - ID (Auto-generated)
    - Recipient (reference to User, Restaurant, or Delivery Executive entity)
    - Message
    - Timestamp
    - Read Status
11. **Category:**
    - ID (Auto-generated)
    - Name
12. **Address:**
    - ID (Auto-generated)
    - Street Address
    - City
    - State/Province
    - Postal Code
    - Country
    
13. contact information
    - email
    - mobile
    - twitter
    - instagram

**service**

**service-implementation**

**controller**


<img width="529" height="264" alt="image" src="https://github.com/user-attachments/assets/513ca7dc-f248-4c07-bc13-65012a3afe1e" />

<img width="492" height="189" alt="image" src="https://github.com/user-attachments/assets/a564b123-ea46-4195-8a97-715ac47629bc" />

<img width="475" height="216" alt="image" src="https://github.com/user-attachments/assets/ad79ca2a-5e7d-4278-b513-55977816587c" />

<img width="526" height="241" alt="image" src="https://github.com/user-attachments/assets/8b31d25d-5655-4b73-86cc-54bcf6b88b50" />

<img width="526" height="241" alt="image" src="https://github.com/user-attachments/assets/03bb4808-165f-4a37-8b5a-33663d0a6950" />

<img width="522" height="268" alt="image" src="https://github.com/user-attachments/assets/3c60d65c-ac39-45d1-9f44-b8ce8f5f9790" />

<img width="524" height="245" alt="image" src="https://github.com/user-attachments/assets/302b2c4d-05bc-4fbe-960a-3403f3928207" />

<img width="482" height="237" alt="image" src="https://github.com/user-attachments/assets/d5109f93-8c0e-4963-81a2-dfdf0bc6ba4d" />


<img width="527" height="270" alt="image" src="https://github.com/user-attachments/assets/b4c80c8b-7385-4487-9d23-0e6bfea9349e" />








