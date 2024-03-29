import express, { Application, Request, Response,  } from "express";
import { baseCompanyUrl } from "../../Config/Constants";
 
//init the app
export const app: Application = express();
//init the cors to avoid blocking on localhost
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))


//.env
require('dotenv').config({path: '../../../.env'})
app.get('/', function (req, res) {
 
 });
//listen to port 5050 for our project
app.listen(process.env.PORT || 5050, () => console.log("server running on port 5050"  ));


const companiesRouter = require("../v1/Routes/CompaniesRoute");
app.use(baseCompanyUrl.toString(), companiesRouter);



