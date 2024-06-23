export class City {
  constructor(name, coordinate) {
    this.cityName = name;
    this.cityPosition = coordinate;
  }

  getCityName() {
    return this.cityName;
  }

  getCityPosition() {
    return this.cityPosition;
  }
}