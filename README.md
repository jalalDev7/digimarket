
# Store Application

This is a fully functional e-commerce store built from scratch using **Next.js**, **Prisma**, and **ShadCN**. The application provides an intuitive shopping experience with a modern and scalable design.

## Features

- **Product Management:** Add, update, and remove products from the store.
- **User Authentication:** Secure login and registration using JWT (or any authentication method you’ve implemented).
- **Shopping Cart:** Add and manage products in the cart.
- **Order Management:** Place orders with a streamlined checkout process.
- **Admin Dashboard:** For managing inventory, orders, and users.
- **Database:** Integrated with Prisma for database management and queries.
- **Modern UI:** Built using ShadCN for sleek and responsive components.
- **Optimized Performance:** Utilizing Next.js features for fast page loading and SSR (Server-Side Rendering).

## Tech Stack

- **Next.js:** React framework with built-in features like SSR and API routes.
- **Prisma:** ORM for interacting with the database.
- **ShadCN:** Component library for a modern and accessible user interface.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **PostgreSQL/MySQL** (or any database Prisma is set up with).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory and configure your database and other credentials (e.g., Stripe API keys).

   Example `.env`:
   ```bash
   DATABASE_URL=your-database-url
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

   Your app should now be running at `http://localhost:3000`.

## Usage

- Visit the homepage to browse products.
- Sign in or register an account to add products to your cart and checkout.
- Admin users can manage products, orders, and users via the dashboard.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for feedback.

## License

This project is licensed under the MIT License.
