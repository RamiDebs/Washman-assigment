import { starbucksPoint } from "../../../Config/Constants";
import { Company } from "../Models/company_model";
import { GeoPoint } from "../Models/geo_point_model";
import { Office } from "../Models/office_model";
import { getCompaniesData } from "./DataLoaderService";
import { sortCompaniesByName } from "./SorterService";

/**
 * getting companies data from json
 */
const companiesData: Company[] = getCompaniesData();

/**
 *
 * @param destinationPoint
 * @returns integer => distance between starbucks point and office point
 */
function getDistanceBetweenStarbucksAndPoint(destinationPoint: GeoPoint) {
  if (checkIfNumbers(+destinationPoint.getLat, +destinationPoint.getLon)) {
    let distance = getDistanceBetweenTwoPoints(
      starbucksPoint.getLat,

      destinationPoint.getLat,
      starbucksPoint.getLon,
      destinationPoint.getLon
    );

    return distance;
  }

  return null;
}

/**
 *
 * @param distance
 * @returns array of nearby companies according to the given distance.
 */
function searchNearbyCompanies(distance: number) {
  var filteredCompaniesBuilder: Company[] = [];
  var calculatedDistance: number;
  var filteredOfficesBuilder: Office[] = [];
  filteredCompaniesBuilder = [];

  companiesData.forEach((company) => {
    filteredOfficesBuilder = [];
    company.getOffices.forEach((office) => {
      calculatedDistance = Math.round(
        getDistanceBetweenStarbucksAndPoint(office.getCoordinates)
      );
      if (calculatedDistance != null) {
        if (+calculatedDistance <= +distance) {
          office.setDistance(+calculatedDistance);
          filteredOfficesBuilder.push(office);
        }
      }
    });
    if (filteredOfficesBuilder.length > 0) {
      company.setOffices(filteredOfficesBuilder);
      filteredCompaniesBuilder.push(company);
    }
  });
  return filteredCompaniesBuilder;
}

/**
 *
 * @param distance
 * @param filteredCompaniesBuilder
 * @returns sorted nearby companies according to company"s name
 */
export function searchAndSortNearbyCompanies(
  distance: number,
  filteredCompaniesBuilder: Company[]
) {
  filteredCompaniesBuilder = searchNearbyCompanies(distance);

  return sortCompaniesByName(filteredCompaniesBuilder);
}

/**
 *
 * @param lat1
 * @param lon1
 * @returns it checks if the points are number so the app dose break
 */
function checkIfNumbers(lat1: unknown, lon1: unknown) {
  if (isNumber(lat1) && isNumber(lon1)) {
    return true;
  }

  return false;
}

/**
 *
 * @param lat1
 * @param lat2
 * @param lon1
 * @param lon2
 * @returns distance between two geo-points
 */
function getDistanceBetweenTwoPoints(
  lat1: number,
  lat2: number,
  lon1: number,
  lon2: number
) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var R: number = 6371e3; // metres
    var φ1: number = (lat1 * Math.PI) / 180; // φ, λ in radians
    var φ2: number = (lat2 * Math.PI) / 180;
    var Δφ: number = ((lat2 - lat1) * Math.PI) / 180;
    var Δλ: number = ((lon2 - lon1) * Math.PI) / 180;

    var a: number =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d: number = (R * c) / 1000;
    return d;
  }
}

/**
 *
 * @param num
 * @returns if the object is number or not
 */
function isNumber(num: unknown) {
  return Number.isFinite(num);
}
