let dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let request = new XMLHttpRequest();

let dataObject;
let values = []; // array of dates/GDP

let scaleY;
let scaleX;
let axisScaleX;
let axisScaleY;

let width = 850;
let height = 500;
let padding = 60;

let svg = d3.select("svg");

request.open("GET", dataUrl, true);
request.onload = () => {
  dataObject = JSON.parse(request.responseText);
  values = dataObject.data;

  createCanvas();
  createScales();
  createBars();
  createAxis();
};
request.send();

function createCanvas() {
  d3.select("body")
    .insert("h1", "#canvas")
    .text("United States GDP")
    .style("font-family", "verdana")
    .attr("id", "title");
  svg.attr("width", width);
  svg.attr("height", height);
}

function createScales() {
  scaleY = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(values, (data) => {
        return data[1];
      }),
    ])
    .range([0, height - 2 * padding]);

  scaleX = d3
    .scaleLinear()
    .domain([0, values.length - 1])
    .range([padding, width - padding]);

  let dates = values.map((data) => {
    return new Date(data[0]);
  });

  axisScaleX = d3
    .scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range([padding, width - padding]);

  axisScaleY = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(values, (data) => {
        return data[1];
      }),
    ])
    .range([height - padding, padding]);
}

function createBars() {
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");

  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (width - 2 * padding) / values.length)
    .attr("data-date", (data) => {
      return data[0];
    })
    .attr("data-gdp", (data) => {
      return data[1];
    })
    .attr("height", (data) => {
      return scaleY(data[1]);
    })
    .attr("x", (data, position) => {
      return scaleX(position);
    })
    .attr("y", (data, position) => {
      return height - padding - scaleY(data[1]);
    })
    .on("mouseover", (event, data) => {
      tooltip.transition().style("visibility", "visible");
      console.log(typeof data[0]);
      tooltip.text(data[0] + " (" + data[1] + " GDP)");
      document.querySelector("#tooltip").setAttribute("data-date", data[0]);
    })
    .on("mouseout", (event, data) => {
      tooltip.transition().style("visibility", "hidden");
    });
}

function createAxis() {
  let xAxisBottom = d3.axisBottom(axisScaleX);
  let yAxisLeft = d3.axisLeft(axisScaleY);
  svg
    .append("g")
    .call(xAxisBottom)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxisLeft)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)");
}
