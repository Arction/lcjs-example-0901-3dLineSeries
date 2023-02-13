/*
 * LightningChartJS example that showcases LineSeries in a 3D Chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Import xydata
const xydata = require('@arction/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, AxisTickStrategies, Themes } = lcjs

// Extract required parts from xyData.
const { createProgressiveTraceGenerator } = xydata

// Initiate chart
const chart3D = lightningChart()
    .Chart3D({
        // theme: Themes.darkGold
    })
    // Set 3D bounding box dimensions to highlight X Axis.
    .setBoundingBox({ x: 1.0, y: 0.5, z: 0.4 })

// Set Axis titles
chart3D.getDefaultAxisX().setTitle('Axis X')
chart3D.getDefaultAxisY().setTitle('Axis Y')
chart3D.getDefaultAxisZ().setTitle('')

// Disable Z Axis ticks as it doesn't represent any actual data dimension (only visual perspective).
chart3D.getDefaultAxisZ().setTickStrategy(AxisTickStrategies.Empty)

// Define Series configuration for simplified example modification.
const seriesConf = [
    {
        name: 'Series A',
        dataAmount: 50,
    },
    {
        name: 'Series B',
        dataAmount: 50,
    },
    {
        name: 'Series C',
        dataAmount: 50,
    },
]

// Set X Axis interval immediately (before all data is streamed).

chart3D.getDefaultAxisX().setInterval({ start: 0, end: seriesConf.reduce((prev, cur) => Math.max(prev, cur.dataAmount), 0) })

// Set Z Axis interval immediately.
chart3D.getDefaultAxisZ().setInterval({ start: -1, end: 1 + seriesConf.reduce((prev, cur, i) => Math.max(prev, i), 0) })

// Create Series and generate test data.
let totalDataAmount = 0
seriesConf.forEach((conf, iSeries) => {
    const seriesName = conf.name || ''
    const seriesDataAmount = conf.dataAmount || 100
    const seriesZ = conf.z || iSeries

    const series = chart3D.addPointLineSeries().setName(seriesName)

    createProgressiveTraceGenerator()
        .setNumberOfPoints(seriesDataAmount)
        .generate()
        .toPromise()
        .then((data) => {
            // Map XY data to XYZ data.
            return data.map((xy) => ({
                x: xy.x,
                y: xy.y,
                z: seriesZ,
            }))
        })
        .then((data) => {
            // Stream data into series very quickly.
            setInterval(() => {
                const batch = data.splice(0, 3)
                if (batch.length > 0) {
                    series.add(batch)
                    totalDataAmount += batch.length
                    chart3D.setTitle(`3D Line Series (${totalDataAmount} data points)`)
                }
            }, 30)
        })
})

// Add LegendBox to chart.
const legend = chart3D
    .addLegendBox()
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.3,
    })
    .add(chart3D)
