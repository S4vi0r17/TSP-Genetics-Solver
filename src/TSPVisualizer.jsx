import React, { useState, useEffect, useRef } from 'react';
import { GeneticsAlgorithm } from './GeneticsAlgorithm';

const TSPVisualizer = () => {
    const [cities, setCities] = useState([]);
    const [bestPath, setBestPath] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);
    const canvasRef = useRef(null);

    const canvasWidth = 800;
    const canvasHeight = 600;

    useEffect(() => {
        drawCanvas();
    }, [cities, bestPath]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Dibujar cuadrícula
        ctx.strokeStyle = '#ddd';
        for (let i = 0; i <= canvasWidth; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvasHeight);
            ctx.stroke();
        }
        for (let i = 0; i <= canvasHeight; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvasWidth, i);
            ctx.stroke();
        }

        // Dibujar ciudades
        cities.forEach((city, index) => {
            ctx.fillStyle = '#00f';
            ctx.beginPath();
            ctx.arc(city.x, city.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.fillText(`City ${index + 1}`, city.x + 10, city.y - 10);
        });

        // Dibujar mejor ruta
        if (bestPath.length > 0) {
            ctx.strokeStyle = '#f00';
            ctx.beginPath();
            ctx.moveTo(bestPath[0].getCityPosition().x, bestPath[0].getCityPosition().y);
            bestPath.forEach((city) => {
                ctx.lineTo(city.getCityPosition().x, city.getCityPosition().y);
            });
            ctx.closePath();
            ctx.stroke();
        }
    };

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCities([...cities, { x, y }]);
    };

    const runAlgorithm = () => {
        const tsp = new GeneticsAlgorithm(20);
        cities.forEach((city, index) => tsp.setNew({ x: city.x, y: city.y }));
        tsp.createPaths();
        tsp.launchSimulation();

        const bestSolution = tsp.paths[0];
        setBestPath(bestSolution.path);
        setTotalDistance(bestSolution.getEuclideanDistance());
    };

    const clearCanvas = () => {
        setCities([]);
        setBestPath([]);
        setTotalDistance(0);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>TSP Visualizer</h1>
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onClick={handleCanvasClick}
                style={{ border: '1px solid black', cursor: 'pointer' }}
            />
            <div style={{ marginTop: '20px' }}>
                <button onClick={runAlgorithm} disabled={cities.length < 2}>
                    Run Algorithm
                </button>
                <button onClick={clearCanvas} style={{ marginLeft: '10px' }}>
                    Clear Canvas
                </button>
                <p>Number of cities: {cities.length}</p>
                <p>Total Distance: {totalDistance.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default TSPVisualizer;