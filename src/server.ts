import { App } from "./app";
import { AuthRoutes } from "./routes/auth.routes";
import { ClientRoutes } from "./routes/client.routes";

const app = new App([new AuthRoutes(), new ClientRoutes()]);

app.listen();