import * as express from 'express';
import { Application } from 'express';
import { searchUsers } from "./users.route";

const app: Application = express();

app.route('/api/users').get(searchUsers); //TODO:  http://localhost:9000/api/users?filter=&sortOrder=asc&pageNumber=2&pageSize=10

const httpServer = app.listen(9000, () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
