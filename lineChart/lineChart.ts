import * as d3 from 'd3'

// Set dimensions and margins for the chart

const margin = { top: 70, right: 30, bottom: 40, left: 80 }
const width = window.innerWidth - margin.left - margin.right
const height = window.innerWidth / 2 - margin.top - margin.bottom

// Create a fake dataset

const dataset = [
  {
    date: new Date('2023-10-03 07:00:00.000+09:00'),
    value: 246,
    image: './Daco_5785243.png',
    beforeGap: -50,
  },
  {
    date: new Date('2023-10-03 12:00:00.000+09:00'),
    value: 58,
    image: './Daco_5785243.png',
    beforeGap: -188,
  },
  {
    date: new Date('2023-10-03 18:00:00.000+09:00'),
    value: 269,
    image: './Daco_5785243.png',
    beforeGap: 211,
  },
  {
    date: new Date('2023-10-03 23:30:00.000+09:00'),
    value: 200,
    image: './Daco_5785243.png',
    beforeGap: -169,
  },
]

// Set up the x and y scales

const x = d3.scaleTime().range([0, width])
const y = d3.scaleLinear().range([height, 0])

// Create the SVG element and append it to the chart container

const svg = d3
  .select('#chart-container')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

d3.select('svg')
  .append('defs')
  .append('pattern')
  .attr('id', 'img1')
  .attr('height', '100%')
  .attr('width', '100%')
  .attr('patternContentUnits', 'objectBoundingBox')
  .append('image')
  .attr('xlink:href', './Daco_5785243.png')
  .attr('width', 1)
  .attr('height', 1)
  .attr('preserveAspectRatio', 0)

// Define the x and y domains

x.domain(d3.extent(dataset, (d) => d.date))
y.domain([0, d3.max(dataset, (d) => d.value)])

// Add the x-axis

const g = svg.append('g').attr('transform', `translate(0,${height})`)

// Add the y-axis

svg.append('g').call(d3.axisLeft(y))
g.call(
  d3
    .axisBottom(x)
    //   .ticks(d3.timeMonth.every(1))
    .tickFormat(d3.timeFormat('%H'))
)
g.selectAll('.textLabels')
  .data(dataset)
  .enter()
  .append('text')
  .classed('textLabels', true)
  .attr('x', function (d) {
    return x(d.date)
  })
  .attr('y', function (d) {
    return y(d.value)
  })
  .text(function (d) {
    return d.value
  })

// Create the line generator

const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.value))
  .curve(d3.curveCatmullRom)

svg
  .append('path')
  .datum(dataset)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1)
  .attr('d', line)

const selectCircle = svg.selectAll('.circle').data(dataset)

selectCircle
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('r', 10)
  .attr('fill', 'url(#img1)')
  .attr('cx', function (d) {
    console.log(d)
    return x(new Date(d.date))
  })
  .attr('cy', function (d) {
    return y(d.value)
  })
