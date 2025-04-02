// lib/database.ts
export const sampleDatabaseInit = `
-- Create Customers table
CREATE TABLE Customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  join_date TEXT NOT NULL,
  phone TEXT -- This can be NULL
);

-- Create Products table
CREATE TABLE Products (
  product_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT, -- This can be NULL
  price REAL NOT NULL,
  category TEXT NOT NULL
);

-- Create Orders table
CREATE TABLE Orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  total_amount REAL NOT NULL,
  shipping_address TEXT, -- This can be NULL
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Order_Items table
CREATE TABLE Order_Items (
  item_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price_each REAL NOT NULL,
  discount_percentage REAL, -- This can be NULL
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Insert sample customers
INSERT INTO Customers (customer_id, first_name, last_name, email, join_date, phone) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '2023-01-15', '555-123-4567'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', NULL),
(3, 'Michael', 'Johnson', 'michael.j@example.com', '2023-03-05', '555-987-6543'),
(4, 'Emily', 'Williams', 'emily.w@example.com', '2023-03-10', NULL),
(5, 'Robert', 'Brown', 'robert.b@example.com', '2023-04-22', '555-456-7890');

-- Insert sample products
INSERT INTO Products (product_id, name, description, price, category) VALUES
(1, 'Laptop Pro', '15-inch high-performance laptop', 1299.99, 'Electronics'),
(2, 'Smartphone X', 'Latest model with high-resolution camera', 799.99, 'Electronics'),
(3, 'Wireless Headphones', NULL, 159.99, 'Electronics'),
(4, 'Coffee Maker', 'Programmable drip coffee maker', 89.99, 'Home Appliances'),
(5, 'Blender', NULL, 69.99, 'Home Appliances'),
(6, 'Running Shoes', 'Lightweight training shoes', 79.99, 'Sportswear'),
(7, 'Yoga Mat', 'Non-slip exercise mat', 29.99, 'Sportswear'),
(8, 'Desk Lamp', NULL, 39.99, 'Home Decor'),
(9, 'Backpack', 'Water-resistant laptop backpack', 49.99, 'Accessories'),
(10, 'Water Bottle', 'Insulated stainless steel bottle', 24.99, 'Accessories');

-- Insert sample orders
INSERT INTO Orders (order_id, customer_id, order_date, total_amount, shipping_address) VALUES
(1, 1, '2023-05-01', 1359.98, '123 Main St, Anytown, USA'),
(2, 2, '2023-05-05', 879.98, NULL),
(3, 3, '2023-05-10', 159.99, '456 Oak Ave, Somewhere, USA'),
(4, 4, '2023-05-15', 129.98, NULL),
(5, 1, '2023-05-20', 74.98, '123 Main St, Anytown, USA'),
(6, 5, '2023-05-25', 189.97, NULL),
(7, 2, '2023-06-01', 39.99, '789 Pine Rd, Elsewhere, USA'),
(8, 3, '2023-06-05', 1329.98, '456 Oak Ave, Somewhere, USA');

-- Insert sample order items
INSERT INTO Order_Items (item_id, order_id, product_id, quantity, price_each, discount_percentage) VALUES
(1, 1, 1, 1, 1299.99, NULL),
(2, 1, 3, 1, 159.99, 10.0),
(3, 2, 2, 1, 799.99, NULL),
(4, 2, 7, 1, 29.99, NULL),
(5, 2, 10, 2, 24.99, 5.0),
(6, 3, 3, 1, 159.99, NULL),
(7, 4, 4, 1, 89.99, 15.0),
(8, 4, 10, 1, 24.99, NULL),
(9, 4, 8, 1, 39.99, NULL),
(10, 5, 7, 1, 29.99, 10.0),
(11, 5, 10, 1, 24.99, NULL),
(12, 6, 5, 1, 69.99, NULL),
(13, 6, 6, 1, 79.99, 5.0),
(14, 6, 7, 1, 29.99, NULL),
(15, 7, 8, 1, 39.99, NULL),
(16, 8, 1, 1, 1299.99, 10.0),
(17, 8, 9, 1, 49.99, NULL);
`;
