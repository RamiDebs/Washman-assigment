import { GeoPoint } from "./geo_point_model";

export class Office {
  private location: string;
  private coordinates: GeoPoint;
  private distance: number = 0;

  constructor(location: string, coordinates: GeoPoint,distance?: number) {
    this.location = location;
    this.coordinates = coordinates;
    this.distance = distance;
    
  }
  public get getLocation() {
    return this.location;
  }
  public get getCoordinates() {
    return this.coordinates;
  }

  public get getDistance() {
    return this.distance;
  }
  public setDistance (distance: number ) {
    this.distance = distance;

  }
   


}
