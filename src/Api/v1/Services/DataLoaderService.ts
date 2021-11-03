import { Company } from "../Models/company_model";
import { GeoPoint } from "../Models/geo_point_model";
import { Office } from "../Models/office_model";
import { default as companiesObjects } from "src/Data/companies.json";

/**
 * 
 * @returns companies data from json file
 */
export function getCompaniesData(): Company[] {
    var companiesBuilder: Company[] = [];
    var singleCompany: Company;
    var companyName = "";
    var companyOffices: Office[] = [];

    companiesObjects.forEach((company) => {
        companyName = company.organization;
        companyOffices = [];

        company.offices.forEach((office) => {
            let locationBuilder = office.coordinates.split(",");

            let officeLocation: GeoPoint = new GeoPoint(
                +locationBuilder[0],
                +locationBuilder[1]
            );
            companyOffices.push(new Office(office.address, officeLocation));
        });

        singleCompany = new Company(companyName, companyOffices);
        companiesBuilder.push(singleCompany);
    });

    return companiesBuilder;
};



