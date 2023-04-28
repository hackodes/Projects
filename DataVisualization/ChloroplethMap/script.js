let usEducationUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
let usCountyUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let usEducationData;
let usCountyData;

let values = [];

let scaleX;
let scaleY;

let width = 1400;
let height = 700;
let padding = 20;
let svg = d3.select("svg");

d3.json(usCountyUrl).then((data, error) => {
  if (error) {
    console.log(error.toString());
  } else {
    usCountyData = topojson.feature(data, data.objects.counties).features;
    d3.json(usEducationUrl).then((data, error) => {
      if (error) {
        console.log(error.toString());
      } else {
        usEducationData = data;
        createMap();
      }
    });
  }
});

function createMap() {
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto")
    .style("margin-top", "-300px")
    .style("margin-left", "900px")
    .style("font-size", "18px");

  d3.select("body")
    .insert("h3", "#canvas")
    .text("United States Educational Attainment")
    .style("font-family", "verdana")
    .attr("id", "title")
    .style("margin-top", "-5px");
  d3.select("body")
    .insert("h6", "#canvas")
    .text(
      "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
    )
    .style("font-family", "verdana")
    .attr("id", "description")
    .style("margin-top", "-10px");
  svg.attr("width", width);
  svg.attr("height", height);

  svg
    .selectAll("path")
    .data(usCountyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("stroke", "white")
    .attr("fill", (data) => {
      let countyId = data["id"];
      let educationCounty = usEducationData.find((data) => {
        return data["fips"] === countyId;
      });
      let percentage = educationCounty["bachelorsOrHigher"];
      if (percentage <= 3) {
        return "#edf8fb";
      } else if (percentage > 3 && percentage <= 12) {
        return "#edf8fb";
      } else if (percentage > 12 && percentage <= 21) {
        return "#ccece6";
      } else if (percentage > 21 && percentage <= 30) {
        return "#99d8c9";
      } else if (percentage > 30 && percentage <= 39) {
        return "#66c2a4";
      } else if (percentage > 39 && percentage <= 48) {
        return "#41ae76";
      } else if (percentage > 48 && percentage <= 57) {
        return "#238b45";
      } else if (percentage > 57 && percentage <= 66) {
        return "#005824";
      } else {
        return "#005824";
      }
    })
    .attr("data-fips", (data) => {
      return data["id"];
    })
    .attr("data-education", (data) => {
      let countyId = data["id"];
      let educationCounty = usEducationData.find((data) => {
        return data["fips"] === countyId;
      });
      let percentage = educationCounty["bachelorsOrHigher"];
      return percentage;
    })
    .on("mouseover", (event, data) => {
      tooltip.transition().style("visibility", "visible");
      let countyId = data["id"];
      let educationCounty = usEducationData.find((data) => {
        return data["fips"] === countyId;
      });
      tooltip.text(
        educationCounty["area_name"] +
          ", " +
          educationCounty["state"] +
          ": " +
          educationCounty["bachelorsOrHigher"] +
          "%"
      );
      tooltip.attr("data-education", educationCounty["bachelorsOrHigher"]);
    })
    .on("mouseout", (event, data) => {
      tooltip.transition().style("visibility", "hidden");
    });
}
