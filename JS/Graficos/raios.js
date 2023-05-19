// var c = get_element("canvas")
// c.width = 1366
// c.height = 625
// var ctx = c.getContext("2d")
// var size = c.width

// var center = { x: size / 2, y: 20 }
// var minSegmentHeight = 5
// var groundHeight = size * 2
// var color = "rgb(255, 255, 255)"
// var roughness = 2
// var maxDifference = size / 5

// function render_raio() {
//   ctx.shadowBlur = 15
//   ctx.globalCompositeOperation = "source-over"
//   ctx.strokeStyle = "White"
//   ctx.shadowBlur = 15
//   var lightning = createLightning()
//   ctx.beginPath()
//   ctx.lineWidth = 7

//   for (var i = 0; i < lightning.length; i++) {
//     ctx.lineTo(lightning[i].x, lightning[i].y)
//   }

//   ctx.stroke()
// }

// function createLightning() {
//   var segmentHeight = groundHeight - center.y
//   var lightning = []

//   lightning.push({ x: Math.random() * size, y: center.y - 20 })
//   lightning.push({ x: Math.random() * (size - 100) + 50, y: groundHeight + (Math.random() - 0.9) * 50 })
//   var currDiff = maxDifference

//   while (segmentHeight > minSegmentHeight) {
//     var newSegments = []

//     for (var i = 0; i < lightning.length - 1; i++) {
//       var start = lightning[i]
//       var end = lightning[i + 1]
//       var midX = (start.x + end.x) / 2
//       var newX = midX + (Math.random() * 2 - 1) * currDiff
//       newSegments.push(start, { x: newX, y: (start.y + end.y) / 2 })
//     }

//     newSegments.push(lightning.pop())
//     lightning = newSegments

//     currDiff /= roughness
//     segmentHeight /= 2
//   }

//   return lightning
// }