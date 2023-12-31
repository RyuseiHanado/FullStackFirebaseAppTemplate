// @ts-ignore
import express from "express";
import vacantHouse from './routes/vacantHouse';
import blog from './routes/blog';

const app: express.Express = express();
const port = 8000;

app.use('/api/vacant_house', vacantHouse);
app.use('/api/blog', blog);

app.listen(port, () => {
    console.log(`Listen started at port ${port}.`);
});

export default app;