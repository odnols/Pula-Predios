const times = []
let fps

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now()
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift()
        }

        times.push(now)
        document.getElementById("fps_counter").innerHTML = times.length
        refreshLoop()
    })
}

refreshLoop()