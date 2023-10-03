import * as d3 from 'd3'

const margin = { top: 70, right: 30, bottom: 0, left: 80 }
const width = window.innerWidth - margin.left - margin.right
const height = window.innerHeight - margin.top - margin.bottom

const x = d3.scaleTime().range([0, width])
const y = d3.scaleTime().range([height, 0])

const svg = d3
  .select('#chart-container')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const dataset = [
  { date: new Date('2022-01-01'), value: 200 },
  { date: new Date('2022-02-01'), value: 250 },
  { date: new Date('2022-03-01'), value: 180 },
  { date: new Date('2022-04-01'), value: 300 },
  { date: new Date('2022-05-01'), value: 280 },
  { date: new Date('2022-06-01'), value: 220 },
  { date: new Date('2022-07-01'), value: 300 },
  { date: new Date('2022-08-01'), value: 450 },
  { date: new Date('2022-09-01'), value: 280 },
  { date: new Date('2022-10-01'), value: 600 },
  { date: new Date('2022-11-01'), value: 780 },
  { date: new Date('2022-12-01'), value: 320 },
]

x.domain(d3.extent(dataset, (d) => d.date))
y.domain([0, d3.max(dataset, (d) => d.value)])

svg
  .append('g')
  .attr('transform', `transition(0, ${height})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat('%b %Y'))
  )

svg.append('g').call(d3.axisLeft(y))

const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.value))

svg
  .append('path')
  .datum(dataset)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1)
  .attr('d', line)
