import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authmiddleware } from './middleware/authMiddleware';
import tenantRoutes from './routes/tenantRoutes'
import managerRoutes from './routes/managerRoutes'
import propertyRoutes from './routes/propertyRoutes'
import leasesRoutes from './routes/leasesRoutes';
import applicationRoutes from './routes/applicationRoutes';
// Route Import

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes 
app.get('/', (req, res) => {
    res.send('This is home route')
});
app.use('/applications', applicationRoutes);
app.use('/properties', propertyRoutes)
app.use('/leases', leasesRoutes);
app.use('/tenants', authmiddleware(['tenant']), tenantRoutes);
app.use('/manager', authmiddleware(['manager']), managerRoutes);
// server
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);

})
