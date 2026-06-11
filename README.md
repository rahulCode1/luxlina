# Luxlina

A full-stack e-commerce project where you can browse, search, add & view details of products.

Built with React frontend, Express/Node backend, and MongoDB database.

---

## Demo Link

[Live Demo](https://luxlina.vercel.app)

---

## Quick Start

```
git clone https://github.com/rahulCode1/luxlina.git
cd luxlina
npm install
npm start
```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- Mongodb
- JWT

## Demo Video

Watch a walkthrough (6 minutes) of all the major features of this app:
[Google drive link](https://drive.google.com/file/d/1sRnu-lii1OZmBhoFYYujOxuP8v8na-eQ/view?usp=sharing)

---

## Features

**Home**

- Display different products category.
- Search products by title, tags.

**Products List**

- View all products.
- Apply different filters, Sort products via price.
- Add, Remove products to Cart & Wishlist.

**Product Details**

- View Product information.
- View similar products.
- Add or Remove to Cart & Wishlist.

**Cart Page**

- Increase or Decrease product quantity.
- Remove from Cart.
- Move to Wishlist.

**Wishlist Page**

- All Products that added to Wishlist.
- Move product to Cart.

**Checkout Page**

- View order summary (Product that added to cart).
- Add, Select address.

**User Profile**
-- Show all User information.
-- Add, Update & delete address.
-- View & Cancel user orders.

**Authentication**
-- Signup with name, email and password.
-- Login with email and password.

---

## API Reference

### **GET /api/products**<br>

List all products<br>
Sample Response:<br>

```
[{_id, name,  description, price, ... }, ...]

```

## **GET /api/products/:productId**<br>

Product details<br>
Sample Response:<br>

```
{id, name, description, ...}

```

## **DELETE /api/product/:id**<br>

Delete Product<br>
Only admin can delete products <br>
Sample Response<br>

## **POST /api/cart**<br>

Add Product to Cart<br>
Sample Response<br>

```
[{name, description, price, ...}, ...]
```

## **GET /api/cart**<br>

GET ProductF from Cart<br>
Sample Response<br>

```
[{name, description, price, ...}, ...]
```

## **PATCH /api/cart/:productId/increase**<br>

Increase product quantity<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/cart/:productId/decrease**<br>

Decrease product quantity<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/cart/:productId/remove**<br>

Remove product from Cart<br>
Sample Response<br>

## **PATCH /api/cart/:productId/moveto_wishlist**<br>

Move Product to Wishlist<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **POST /api/wishlist/:productId**<br>

Add or Remove Product to Wishlist<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/wishlist/:productId**<br>

Move Product to Cart.<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **POST /api/address/new**<br>

Add new Address<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address**<br>

Get user addresses<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address/address_info/:addressId**<br>

Get user addresse details<br>
Sample Response<br>

```
{name, phoneNumber, zipCode,  ...}
```

## **PATCH /api/address/update/:addressId/default**<br>

Update default address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **PATCH /api/address/update/:addressId**<br>

Update address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **DELETE /api/address/:addressId**<br>

Delete user addresses<br>

## **POST /api/order**<br>

Place Order.<br>
Sample Response<br>

```
{products: [], orderSummary: {}, address, ...}
```

## **GET /api/order**<br>

Get User Order.<br>
Sample Response<br>

```
[{products: [], orderSummary: {}, address, ...}]
```

## **POST /api/user/signup**<br>

Add new User<br>
Sample Response<br>

```
{name,  email, password }


```

## **POST /api/user/login**<br>

Login User<br>
Sample Response<br>

```
{ email, password }
```

## **Guest Login**

```
Email: guest@gmail.com
Password: 123456789
```

## Contact

For bugs or feature request, please reach out to rahul7497678@gmail.com
