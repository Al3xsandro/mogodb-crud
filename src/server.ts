import express from "express"; 
import "./config/connection";
import { productsRoutes } from "./routes/products.routes";
import { usersRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use(usersRoutes);
app.use(productsRoutes);

app.listen(3000, () => {
    console.log(`Server listen on port 3000 🚀`)
});

export { app };