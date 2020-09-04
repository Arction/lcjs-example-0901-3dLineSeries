/*
 * LightningChartJS example that showcases LineSeries in a 3D Chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    SolidFill,
    ColorRGBA,
    UIElementBuilders,
    UILayoutBuilders,
    Themes
} = lcjs

// Define colors used for the Series
const red = new SolidFill({ color: ColorRGBA(255, 100, 100) })
const blue = new SolidFill({ color: ColorRGBA(100, 100, 255) })
const green = new SolidFill({ color: ColorRGBA(100, 255, 100) })

// Initiate chart
const chart3D = lightningChart().Chart3D({
    // theme: Themes.dark
})
    .setTitle('3D Line Series')
    .setBoundingBox({ x: 1.0, y: 1.0, z: 2.0 })

// Set Axis titles
chart3D.getDefaultAxisX().setTitle('Axis X')
chart3D.getDefaultAxisY().setTitle('Axis Y')
chart3D.getDefaultAxisZ().setTitle('Axis Z')

// Add a layout UI element for checkboxes
const layout = chart3D.addUIElement(UILayoutBuilders.Column)
    .setPosition({ x: 90, y: 90 })
    .setOrigin({ x: 1, y: 1 })

// Flag for camera rotation
let rotateCamera = false
// Add button for toggling camera rotation into the layout UI Element
const rotateCameraButton = layout.addElement(UIElementBuilders.CheckBox)
    .setText('Rotate camera')
rotateCameraButton.onSwitch((_, state) => {
    rotateCamera = state
})
rotateCameraButton.setOn(rotateCamera)

// Method to handle animating camera rotation.
let cameraAngle = 0
const dist = 1
const animateCameraRotation = () => {
    if (rotateCamera) {
        chart3D.setCameraLocation(
            {
                x: Math.cos(cameraAngle) * dist,
                y: 0.50,
                z: Math.sin(cameraAngle) * dist
            }
        )
        cameraAngle += 0.005
    }
    requestAnimationFrame(animateCameraRotation)
}
animateCameraRotation()

// Add new series and style them
const blueSeries = chart3D.addLineSeries()
    .setLineStyle((lineStyle) => lineStyle.setFillStyle(blue).setThickness(30))
const redSeries = chart3D.addLineSeries()
    .setLineStyle((lineStyle) => lineStyle.setFillStyle(red).setThickness(30))
const greenSeries = chart3D.addLineSeries()
    .setLineStyle((lineStyle) => lineStyle.setFillStyle(green).setThickness(100))

// Create data for the blue and red Series rotating around the green Series.
let z = 0
let z2 = 0
let ang = -5

for (let i = 0; i < 100; i++) {
    cameraAngle -= 5
    ang += 5
    z -= 0.5
    z2 += 0.5
    blueSeries.add({ x: Math.sin(cameraAngle * Math.PI / 180), y: Math.cos(cameraAngle * Math.PI / 180), z })
    redSeries.add({ x: Math.sin(ang * Math.PI / 180), y: Math.cos(ang * Math.PI / 180), z: z2 })
}
// Add data for the green Series.
greenSeries.add({ x: 0, y: 0, z: -51 })
greenSeries.add({ x: 0, y: 0, z: 51 })
