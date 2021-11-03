import { Company } from "../Models/company_model";

/**
 * 
 * @param companies 
 * @returns sorter companies array
 */
export function sortCompaniesByName(companies: Company[]) {
    return companies.sort((a: Company, b: Company) => (a.getName > b.getName ? 1 : -1));
}