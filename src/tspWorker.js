import { GeneticsAlgorithm } from './GeneticsAlgorithm';

self.onmessage = function(e) {
  const { cities, generations } = e.data;
  
  const tsp = new GeneticsAlgorithm(generations);
  cities.forEach((city) => tsp.setNew({ x: city.x, y: city.y }));
  tsp.createPaths();
  tsp.launchSimulation();
  
  const bestSolution = tsp.paths[0];
  
  self.postMessage({
    bestPath: bestSolution.path,
    totalDistance: bestSolution.getEuclideanDistance()
  });
};