# Semantic Backend

This repository contains the backend implementation for a PageRank calculation system. The backend is developed using Node.js and Express.js.

## Getting Started

To get started with the project, follow these instructions:

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/talal-098/semantic-backend.git
   ```

2. Navigate to the project directory:

   ```sh
   cd semantic-backend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

### Usage

1. Start the server:

   ```sh
   npm start
   ```

2. The server will start running at http://localhost:3001

### Test Cases

To run the test cases:

```sh
npm test
```

### Known Limitations:

1. The number of iterations is fixed to 10.
2. The damping factor is set to 0.85.
3. The initial page rank of all pages is 1/N. N being the total Number of Pages.
4. The formula used for PageRank calculation is: (1-d)/N + d(PR(B) / L(B) + ...).

### Frontend Repository

The frontend for this project is located in a separate repository, available at the following link:

https://github.com/talal-098/semantic-frontend

Feel free to explore the frontend repository to understand the complete system and its functionalities.
