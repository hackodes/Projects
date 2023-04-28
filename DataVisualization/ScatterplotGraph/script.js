let dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let request = new XMLHttpRequest();
let values = [];

let scaleX;
let scaleY;

let width = 800;
let height = 450;
let padding = 100;

let svg = d3.select("svg");

request.open("GET", dataUrl, true);
request.onload = () => {
  values = JSON.parse(request.responseText);

  createCanvas();
  createScales();
  createScatterValues();
  createAxis();
};
request.send();

function createCanvas() {
  d3.select("body")
    .insert("h3", "#canvas")
    .text("Doping in Professional Bicycle Racing")
    .style("font-family", "verdana")
    .attr("id", "title")
    .style("margin-top", "-5px");
  d3.select("body")
    .insert("h6", "#canvas")
    .text("35 Fastest times up Alpe d'Huez")
    .style("font-family", "verdana")
    .attr("id", "title2")
    .style("margin-top", "-10px");
  svg.attr("width", width);
  svg.attr("height", height);

  d3.select("body").append("div").attr("id", "legend");
  d3.select("#legend")
    .insert("p", "#legend")
    .text("Legend:")
    .style("color", "black")
    .style("font-weight", "bold")
    .style("font-family", "Verdana")
    .style("text-decoration", "underline")
    .style("font-size", "11px");
  d3.select("#legend")
    .insert("p", "#legend")
    .text("No doping allegations")
    .style("color", "blue")
    .style("font-weight", "bold")
    .style("font-family", "Verdana")
    .style("font-size", "11px");
  d3.select("#legend")
    .insert("p", "#legend")
    .text("Riders with doping allegations")
    .style("color", "red")
    .style("font-weight", "bold")
    .style("font-family", "Verdana")
    .style("font-size", "11px");

  svg
    .append("text")
    .attr("x", 25)
    .attr("y", 240)
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .text("Time")
    .style("font-family", "Verdana")
    .style("font-weight", "bold");
  svg
    .append("text")
    .attr("x", 400)
    .attr("y", 400)
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .text("Year")
    .style("font-family", "Verdana")
    .style("font-weight", "bold");
}

function createScales() {
  scaleX = d3
    .scaleLinear()
    .domain([
      d3.min(values, (data) => {
        return data["Year"];
      }) - 1,
      d3.max(values, (data) => {
        return data["Year"];
      }) + 1,
    ])
    .range([padding, width - padding]);

  scaleY = d3
    .scaleTime()
    .domain([
      d3.min(values, (data) => {
        return new Date(data["Seconds"] * 1000);
      }),
      d3.max(values, (data) => {
        return new Date(data["Seconds"] * 1000);
      }),
    ])
    .range([padding, height - padding]);
}

function createScatterValues() {
  // let tooltip = d3.select('#legend').insert('div', '#legend').attr('id', 'tooltip').style('visibility', 'hidden').style('width', 'auto').style('height', 'auto')
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto")
    .style("margin-top", "10px")
    .style("font-weight", "bold")
    .style("font-family", "Verdana")
    .style("background-color", "lightblue")
    .style("padding", "10px")
    .style("border-radius", "10px")
    .style("border", "1px solid black")
    .style("font-size", "11px");

  svg
    .selectAll("circle")
    .data(values)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", "4")
    .attr("data-xvalue", (data) => {
      return data["Year"];
    })
    .attr("data-yvalue", (data) => {
      return new Date(data["Seconds"] * 1000);
    })
    .attr("cx", (data) => {
      return scaleX(data["Year"]);
    })
    .attr("cy", (data) => {
      return scaleY(new Date(data["Seconds"] * 1000));
    })
    .attr("fill", (data) => {
      if (data["URL"] != "") {
        return "red";
      } else {
        return "blue";
      }
    })
    .on("mouseover", (event, data) => {
      tooltip.transition().style("visibility", "visible");
      if (data["Doping"] != "") {
        tooltip.text(
          data["Name"] +
            " (" +
            data["Year"] +
            ")" +
            " - Time: " +
            data["Time"] +
            " (" +
            data["Doping"] +
            ")"
        );
      } else {
        tooltip.text(
          data["Name"] +
            " (" +
            data["Year"] +
            ")" +
            " - Time: " +
            data["Time"] +
            " (No doping allegations)"
        );
      }
      tooltip.attr("data-year", data["Year"]);
    })
    .on("mouseout", (event, data) => {
      tooltip.transition().style("visibility", "hidden");
    });
}

function createAxis() {
  let axisBottom = d3.axisBottom(scaleX).tickFormat(d3.format("d"));
  let axisLeft = d3.axisLeft(scaleY).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .append("g")
    .call(axisBottom)
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")");

  svg
    .append("g")
    .call(axisLeft)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)");
}
