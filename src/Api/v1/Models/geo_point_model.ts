export class GeoPoint {
  private lat: number;
  private lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
  public get getLat() {
    return this.lat;
  }
  public get getLon() {
    return this.lon;
  }
}
