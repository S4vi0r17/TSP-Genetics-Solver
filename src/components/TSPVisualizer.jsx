import { useState, useEffect, useRef } from 'react';
import { GeneticsAlgorithm } from '../logic/GeneticsAlgorithm';

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
        ctx.strokeStyle = '#d4d4d8';
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
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(city.x, city.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#115e59';
            ctx.fillText(`City ${index + 1}`, city.x + 10, city.y - 10);
        });

        // Dibujar mejor ruta
        if (bestPath.length > 0) {
            const originalLineWidth = ctx.lineWidth; // Paso 1: Guardar el grosor de línea actual
            ctx.strokeStyle = '#fb923c';
            ctx.lineWidth = 3; // Paso 2: Establecer el nuevo grosor de línea
            // Paso 3: Dibujar la mejor ruta
            ctx.beginPath();
            ctx.moveTo(bestPath[0].getCityPosition().x, bestPath[0].getCityPosition().y);
            bestPath.forEach((city) => {
                ctx.lineTo(city.getCityPosition().x, city.getCityPosition().y);
            });
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = originalLineWidth; // Paso 4: Restablecer el grosor de línea
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
        cities.forEach((city) => tsp.setNew({ x: city.x, y: city.y }));
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
        <div className='min-h-screen flex flex-col justify-center items-center p-5 gap-5'>
            <h1 className='text-5xl font-bold mb-6 text-orange-400'>TSP - GeneticsAlgorithm</h1>
            <div
                className='flex items-center justify-center gap-16'
            >
                <canvas
                    className='cursor-pointer shadow-xl'
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    onClick={handleCanvasClick}
                />
                <div
                    className='flex flex-col gap-5 items-center shadow-xl p-5'
                >
                    <p
                        className='text-lg font-medium'
                    >
                        Number of cities: {cities.length}
                    </p>
                    <p
                        className='text-lg font-medium'
                    >
                        Total Distance: {totalDistance.toFixed(2)}
                    </p>
                    <div className='flex gap-2'>
                        <button
                            onClick={runAlgorithm}
                            disabled={cities.length < 2}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${cities.length < 2 ? 'bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'bg-blue-500'}`}
                        >
                            Run Algorithm
                        </button>
                        <button
                            onClick={clearCanvas}
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                        >
                            Clear Canvas
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TSPVisualizer;
