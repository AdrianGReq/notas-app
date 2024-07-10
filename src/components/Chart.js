import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ notes, filter }) => {
    const pieCanvasRef = useRef(null);
    const barCanvasRef = useRef(null);

    useEffect(() => {
        const filteredNotes = filter.length > 0 
            ? notes.filter(note => filter.includes(note.category)) 
            : notes;

        const categories = ['personal', 'work', 'tasks', 'other'];
        const categoryIcons = {
            personal: 'icon-personal.png',
            work: 'icon-work.png',
            tasks: 'icon-tasks.png',
            other: 'icon-other.png',
        };

        const categoryCounts = categories.map(category => filteredNotes.filter(note => note.category === category).length);
        const colors = ['#8eb8e5', '#d3b8ae', '#6cbf6f', '#d6b8db'];

        const images = categories.map(category => {
            const img = new Image();
            img.src = categoryIcons[category];
            return img;
        });

        // Configuración del gráfico de pastel
        const pieCtx = pieCanvasRef.current.getContext('2d');
        const pieData = {
            labels: categories,
            datasets: [{
                data: categoryCounts,
                backgroundColor: colors,
            }]
        };

        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            },
            plugins: [{
                id: 'centerIcons',
                afterDatasetsDraw: (chart) => {
                    const { ctx, chartArea: { left, top, width, height } } = chart;
                    const dataset = chart.getDatasetMeta(0).data;

                    dataset.forEach((data, index) => {
                        const { x, y } = data.tooltipPosition();
                        const img = images[index];
                        ctx.drawImage(img, x - 15, y - 15, 30, 30);
                    });
                }
            }]
        });

        // Configuración del gráfico de barras
        const barCtx = barCanvasRef.current.getContext('2d');
        const barData = {
            labels: categories,
            datasets: [{
                label: 'Notas por categoría',
                data: categoryCounts,
                backgroundColor: colors,
            }]
        };

        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: barData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Categorías'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de notas'
                        }
                    }
                }
            }
        });

        return () => {
            pieChart.destroy();
            barChart.destroy();
        };
    }, [notes, filter]);

    return (
        <div className="chart-container">
            <canvas ref={pieCanvasRef} />
            <canvas ref={barCanvasRef} />
        </div>
    );
};

export default ChartComponent;
