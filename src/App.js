import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    LinearScale, 
    PointElement, 
    Tooltip, 
    Legend, 
    CategoryScale 
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, CategoryScale);

const App = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch the JSON data from the public folder (output of your Python script)
        fetch('./youtube_trends.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(rawData => {
                
                // Define colors for each content type for clear visualization
                const colorMap = {
                    "Gaming": 'rgba(255, 99, 132, 0.7)',
                    "Educational": 'rgba(54, 162, 235, 0.7)',
                    "Vlog/Lifestyle": 'rgba(255, 206, 86, 0.7)',
                    "Short-Form Drama": 'rgba(75, 192, 192, 0.7)'
                };

                // Group data by Content Type
                const groupedData = rawData.reduce((acc, item) => {
                    if (!acc[item.Content_Type]) {
                        acc[item.Content_Type] = [];
                    }
                    acc[item.Content_Type].push(item);
                    return acc;
                }, {});

                // Transform data into Chart.js datasets format
                const datasets = Object.keys(groupedData).map(type => ({
                    label: type,
                    data: groupedData[type].map(d => ({
                        // X-axis: Video Length (in minutes)
                        x: d.Video_Length_Min, 
                        // Y-axis: Engineered Virality Score
                        y: d.Virality_Score, 
                        // Store the title for the tooltip
                        title: d.Title
                    })),
                    backgroundColor: colorMap[type],
                }));

                setChartData({ datasets });
            })
            .catch(error => {
                console.error("Error loading data. Did you run the Python script?", error);
                // Optionally set an error message in state for the user
            });
    }, []);

    if (!chartData) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Loading Content Genome... 🎬</div>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: 'Video Length (Minutes)' },
                beginAtZero: true
            },
            y: {
                title: { display: true, text: 'Engineered Virality Score (Engagement-Adjusted)' },
                beginAtZero: true
            }
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dataPoint = context.raw;
                        return [
                            `Type: ${context.dataset.label}`,
                            `Virality: ${dataPoint.y.toFixed(0)}`,
                            `Length: ${dataPoint.x} min`
                        ];
                    },
                    title: (context) => context[0].raw.title
                }
            }
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{color: '#E50914'}}>📈 Personal Project: YouTube Content Genome</h1>
            <p style={{fontSize: '1.1em', marginBottom: '30px'}}>
                Identifying high-impact content formats by plotting Video Length against an Engineered Virality Score (Views per Day * Like Ratio). The clusters reveal optimal duration for different content types.
            </p>
            
            <div style={{ height: '600px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <Scatter data={chartData} options={options} />
                
            </div>
            
            <h3 style={{marginTop: '40px', borderBottom: '2px solid #E50914', paddingBottom: '5px'}}>🔑 Data Storytelling: Business Insights</h3>
            <ul style={{lineHeight: '1.6'}}>
                <li>Optimal Length: We can visually identify the *sweet spot* for each genre. For example, highly viral **Short-Form Drama (teal/green points) consistently peaks under 8 minutes.</li>
                <li>Educational Investment: Educational content (blue points) has a high-virality distribution across longer formats (15-30+ minutes), suggesting audiences are willing to invest more time in quality educational series.</li>
                <li>Recommended Insights: Creators should prioritize creating snappy, short-form pilots for drama/comedy (to capture quick attention) and invest in longer, binge-worthy content for educational/documentary genres.</li>
                <li> Note: The current Engineered Virality Score is calculated solely using intrinsic metrics (Views, Likes, and Time Since Publish). While this effectively measures a video's immediate success based on audience reception, it is subject to significant external bias. (Some factors not accounted for include: Creator Bias - videos being well-established creators with large, loyal subscriber bases and External Market - Aggressive promotion on other platforms (e.g., Tiktok, Instagram, TV commercials). Therefore my current insight on "optimal length" better reflects the consumption habits of already-primed audiences, rather than true organic format effectiveness.</li> 
            </ul>
        </div>
    );
};

export default App;

