import { GeoPoint } from "../Api/v1/Models/geo_point_model";

/**
 * constant startbucks geo-point
 */
export const starbucksPoint: GeoPoint = new GeoPoint(51.5144636, -0.142571);


//Api Urls
export const baseApiUrl: String = "/api"; 
export const baseCompanyUrl: String= baseApiUrl.concat("/companies"); 
export const baseCompanyInviteUrl: String = "/invite"; 
 