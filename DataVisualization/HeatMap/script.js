let dataUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let request = new XMLHttpRequest();
let values = [];
let temperature;

let scaleX;
let scaleY;

let width = 1325;
let height = 550;
let padding = 100;
let svg = d3.select("svg");

let lowestYear;
let highestYear;

request.open("GET", dataUrl, true);
request.onload = () => {
  let data = JSON.parse(request.responseText);
  temperature = data["baseTemperature"];
  values = data["monthlyVariance"];

  createScales();
  createAxis();
  createCanvas();

  createCells();
};
request.send();

function createCanvas() {
  d3.select("body")
    .insert("h3", "#canvas")
    .text("Monthly Global Land-Surface Temperature")
    .style("font-family", "verdana")
    .attr("id", "title")
    .style("margin-top", "-5px");
  d3.select("body")
    .insert("h6", "#canvas")
    .text("1753-2015: base temperature 8.66℃")
    .style("font-family", "verdana")
    .attr("id", "description")
    .style("margin-top", "-10px");
  svg.attr("width", width);
  svg.attr("height", height);

  svg
    .append("text")
    .attr("x", 30)
    .attr("y", 280)
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .text("Months")
    .style("font-family", "Verdana")
    .style("font-weight", "bold");
  svg
    .append("text")
    .attr("x", 650)
    .attr("y", 500)
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .text("Years")
    .style("font-family", "Verdana")
    .style("font-weight", "bold");
}

function createScales() {
  lowestYear = d3.min(values, (data) => {
    return data["year"];
  });

  highestYear = d3.max(values, (data) => {
    return data["year"];
  });

  scaleX = d3
    .scaleLinear()
    .domain([lowestYear, highestYear + 1])
    .range([padding, width - padding]);

  scaleY = d3
    .scaleTime()
    .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
    .range([padding, height - padding]);
}

function createCells() {
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto")
    .style("margin-top", "-60px")
    .style("margin-left", "250px")
    .style("font-size", "18px");

  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (data) => {
      if (data["variance"] + temperature <= 2.8) {
        return "#fff5eb";
      } else if (
        data["variance"] + temperature > 2.9 &&
        data["variance"] + temperature <= 3.9
      ) {
        return "#fff5eb";
      } else if (
        data["variance"] + temperature > 3.9 &&
        data["variance"] + temperature <= 5.0
      ) {
        return "#fee6ce";
      } else if (
        data["variance"] + temperature > 5.0 &&
        data["variance"] + temperature <= 6.1
      ) {
        return "#fdd0a2";
      } else if (
        data["variance"] + temperature > 6.1 &&
        data["variance"] + temperature <= 7.2
      ) {
        return "#fdae6b";
      } else if (
        data["variance"] + temperature > 7.2 &&
        data["variance"] + temperature <= 8.3
      ) {
        return "#fd8d3c";
      } else if (
        data["variance"] + temperature > 8.3 &&
        data["variance"] + temperature <= 9.5
      ) {
        return "#f16913";
      } else if (
        data["variance"] + temperature > 9.5 &&
        data["variance"] + temperature <= 10.6
      ) {
        return "#d94801";
      } else if (
        data["variance"] + temperature > 10.6 &&
        data["variance"] + temperature <= 11.7
      ) {
        return "#a63603";
      } else {
        return "#7f2704";
      }
    })
    .attr("data-temp", (data) => {
      return data["variance"] + temperature;
    })
    .attr("data-month", (data) => {
      return data["month"] - 1;
    })
    .attr("data-year", (data) => {
      return data["year"];
    })
    .attr("height", (height - 2 * padding) / 12)
    .attr("y", (data) => {
      return scaleY(new Date(0, data["month"] - 1, 0, 0, 0, 0, 0));
    })
    .attr("width", (data) => {
      return (width - 2 * padding) / (highestYear - lowestYear);
    })
    .attr("x", (data) => {
      return scaleX(data["year"]);
    })
    .on("mouseover", (event, data) => {
      tooltip.transition().style("visibility", "visible");

      let temp = (temperature + data["variance"]).toFixed(2);

      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      tooltip.text(
        data["year"] +
          " - " +
          months[data["month"] - 1] +
          ": " +
          temp +
          "℃ (" +
          data["variance"] +
          "℃)"
      );

      tooltip.attr("data-year", data["year"]);
    })
    .on("mouseout", (event, data) => {
      tooltip.transition().style("visibility", "hidden");
    });
}

function createAxis() {
  let axisBottom = d3.axisBottom(scaleX).tickFormat(d3.format("d"));
  svg
    .append("g")
    .call(axisBottom)
    .attr("transform", "translate(0," + (height - padding) + ")")
    .attr("id", "x-axis");

  let axisLeft = d3.axisLeft(scaleY).tickFormat(d3.timeFormat("%B"));
  svg
    .append("g")
    .call(axisLeft)
    .attr("transform", "translate(" + padding + ",0)")
    .attr("id", "y-axis");
}
