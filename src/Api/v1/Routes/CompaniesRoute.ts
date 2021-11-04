import { Request, Response, Router } from "express";
import { Company } from "../Models/company_model";
import { searchAndSortNearbyCompanies } from "../Services/DistanceCalculatorService";
import { baseCompanyInviteUrl, baseCompanyUrl, } from "../../../Config/Constans";
import { app } from "../app";

const express = require('express');
const router: Router = express.Router();

/**
 * Empty company array
 */
var filteredCompanies: Company[] = [];

/**
 *
 * @param req
 * @param res
 * endpoint function for getting nearby companies
 */
function inviteCompanies(req: Request, res: Response) {
    //clearing data
    if (filteredCompanies.length > 0) {
        filteredCompanies = [];
    }
    filteredCompanies = searchAndSortNearbyCompanies(
        +req.params.distance,
        filteredCompanies
    );

    if (filteredCompanies != null && filteredCompanies.length > 0) {
        let jsonResult = JSON.stringify(filteredCompanies);
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.send(jsonResult);
    } else {
        res.status(400).send("No Data found");
    }
}

/**
 * getCompanies api end point
 */

router.get(baseCompanyInviteUrl.concat("/:distance"), inviteCompanies);
app.use(baseCompanyUrl.toString(), router);

module.exports = router;
