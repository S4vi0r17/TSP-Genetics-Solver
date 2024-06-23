export class Path {
  constructor() {
    this.path = [];
    this.totalDistance = 0;
  }

  getCityFromPath(index) {
    return this.path[index];
  }

  calculateDistance(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
    );
  }

  calculateEuclideanDistance() {
    let euclideanDistance = 0;
    for (let i = 0; i < this.path.length; i++) {
      if (i !== this.path.length - 1) {
        euclideanDistance += Math.sqrt(
          Math.pow(
            this.path[i + 1].getCityPosition().x -
            this.path[i].getCityPosition().x,
            2
          ) +
          Math.pow(
            this.path[i + 1].getCityPosition().y -
            this.path[i].getCityPosition().y,
            2
          )
        );
      } else {
        euclideanDistance += Math.sqrt(
          Math.pow(
            this.path[0].getCityPosition().x - this.path[i].getCityPosition().x,
            2
          ) +
          Math.pow(
            this.path[0].getCityPosition().y -
            this.path[i].getCityPosition().y,
            2
          )
        );
      }
    }
    this.totalDistance = euclideanDistance;
  }

  getEuclideanDistance() {
    return this.totalDistance;
  }

  addCity(city) {
    this.path.push(city);
  }

  isValidPath() {
    const visitedCities = new Set();
    for (const city of this.path) {
      if (visitedCities.has(city.getCityName())) {
        return false;
      }
      visitedCities.add(city.getCityName());
    }
    return (
      this.path.length > 0 &&
      this.path[0].getCityName() ===
      this.path[this.path.length - 1].getCityName()
    );
  }
}