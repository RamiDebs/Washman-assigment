import express, { Application, Request, Response,  } from "express";
import "../.env"
//init the app
const app: Application = express();
//init the cors to avoid blocking on localhost
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

//.env
require('dotenv').config()


//listen to port 8080 for our project
app.listen(process.env.PORT, () => console.log("server running on port"+ process.env.PORT));

//testing simple base api call
app.get("/", ( req: Request, res: Response) => {
    res.send("Hello from the server");
  });
 