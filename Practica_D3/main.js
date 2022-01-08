const diCaprioBirthYear = 1974;
const age = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

// ----------------------------------------------------------

// Constantes:
const height = 600
const width = 1000
const margins = {
    top: 10,
    bottom: 40,
    left: 40,
    right:10
}

// Declaramos el svg y el grupo de elementos:
const svg = d3.select("#chart").append("svg").attr("id", "svg").attr("height", height).attr("width", width)
const elementGroup = svg.append("g").attr("id", "elementGroup")
    .attr("transform", `translate(${margins.left},${margins.top})`)

// Declaramos ejes y escalas:
var x = d3.scaleBand().range([0, width - margins.left - margins.right]).padding(0.1)
var y = d3.scaleLinear().range([height - margins.top - margins.bottom, 0])

// Grupos de ejes:
const groupAxis = svg.append("g").attr("id", "groupAxis")
const groupX = svg.append("g").attr("id", "groupX").attr("transform", `translate(${margins.left}, ${height - margins.bottom})`)
const groupY = svg.append("g").attr("id", "groupY").attr("transform", `translate(${margins.left}, ${margins.top})`)

// Funciones que dibujan los ejes:
const xAxis = d3.axisBottom().scale(x).ticks(22)
const yAxis = d3.axisLeft().scale(y)

// Funcion para tratar los años:
const formatDate = d3.timeParse("%Y")

// Importamos los datos:

d3.csv("data.csv").then(data => {
    
    data.map(d => {
        d.age = +d.age
        d.year = +d.year
    })
   
    // Añadimos dominio a la escala:
    x.domain(data.map(d => d.year))
    y.domain([15, ageToday]) // Tomamos 15 años como edad inferior igual que el grafico de ejemplo

    // Llamamos a los ejes:
    groupX.call(xAxis)
    groupY.call(yAxis)

    // Pintamos las barras:
    var elements = elementGroup.selectAll("bar").data(data)
    elements.enter().append("rect")

        .attr("class", "bar")
        .attr("id", d => d.name.replace(/\s/g, ""))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margins.top - margins.bottom - y(d.age))
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.age))

    // Pintamos los circulos:
    var elements2 = elementGroup.selectAll("circle").data(data)    
        elements.enter().append("circle")
            .attr("id", "circle")
            .attr("cx", d => x(d.year)+18)
            .attr("cy", d => y(d.year - diCaprioBirthYear))
            .attr("r", 7)
            .attr("fill", "orange")
    
    // Pintamos la linea:
    elementGroup.datum(data).append('path')
        .attr("id", "LeonardoDiCaprio")
        .attr("d", d3.line()
            .x(d => x(d.year)+18)
            .y(d => y(d.year - diCaprioBirthYear))
        )
})

