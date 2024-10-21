// /**
//  * Required External Modules
//  */

// import * as dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import { itemsRouter } from "./items/items.router";

// /**
//  * Hardcoded Port for the Application
//  */
// dotenv.config();

// /**
//  * App Variables
//  */

// if (!process.env.PORT) {
//     process.exit(1);
// }

// const PORT: number = parseInt(process.env.PORT as string, 10);

// const app = express();
// /**
//  *  App Configuration
//  */

// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use("/api/menu/items", itemsRouter);
// /**
//  * Server Activation
//  */

// console.log("PORT:", PORT);

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";



/**
 * Hardcoded Port for the Application
 */
dotenv.config(); // Comment this out if you don't need to use environment variables temporarily

/**
 * App Variables
 */

// Remove the check for process.env.PORT and hardcode the port value
const PORT: number = 7000; // Hardcoded port

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

console.log("PORT:", PORT);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
