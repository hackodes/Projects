let dataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
let request = new XMLHttpRequest();
let gameData;

let scaleX;
let scaleY;

let width = 1050;
let height = 600;
let padding = 50;
let svg = d3.select("svg");

d3.json(dataUrl).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    gameData = data;
    createCanvas();
  }
});

function createCanvas() {
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "225px")
    .style("height", "100px")
    .style("margin-top", "-500px")
    .style("margin-left", "1100px")
    .style("font-size", "12px");

  d3.select("body")
    .insert("h3", "#canvas")
    .text("Video Game Sales")
    .style("font-family", "verdana")
    .attr("id", "title")
    .style("margin-top", "-5px");
  d3.select("body")
    .insert("h6", "#canvas")
    .text("Top 100 Most Sold Video Games Grouped by Platform")
    .style("font-family", "verdana")
    .attr("id", "description")
    .style("margin-top", "-10px");
  svg.attr("width", width);
  svg.attr("height", height);

  let structure = d3
    .hierarchy(gameData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeDiagram = d3.treemap().size([width, height]);

  createTreeDiagram(structure);

  let tile = svg
    .selectAll("g")
    .data(structure.leaves())
    .enter()
    .append("g")
    .attr("transform", (data) => {
      return "translate(" + data["x0"] + ", " + data["y0"] + ")";
    });

  tile
    .append("rect")
    .attr("class", "tile")
    .attr("stroke", "black")
    .attr("fill", (data) => {
      let gameCategory = data["data"]["category"];
      if (gameCategory === "Wii") {
        return "#a6cee3";
      } else if (gameCategory === "DS") {
        return "#1f78b4";
      } else if (gameCategory === "X360") {
        return "#b2df8a";
      } else if (gameCategory === "GB") {
        return "#33a02c";
      } else if (gameCategory === "PS3") {
        return "#fb9a99";
      } else if (gameCategory === "NES") {
        return "#e31a1c";
      } else if (gameCategory === "PS2") {
        return "#fdbf6f";
      } else if (gameCategory === "3DS") {
        return "#ff7f00";
      } else if (gameCategory === "PS4") {
        return "#cab2d6";
      } else if (gameCategory === "SNES") {
        return "#6a3d9a";
      } else if (gameCategory === "PS") {
        return "#ffff99";
      } else if (gameCategory === "N64") {
        return "#b15928";
      } else if (gameCategory === "GBA") {
        return "#8c510a";
      } else if (gameCategory === "XB") {
        return "#d8b365";
      } else if (gameCategory === "PC") {
        return "#f6e8c3";
      } else if (gameCategory === "2600") {
        return "#c7eae5";
      } else if (gameCategory === "PSP") {
        return "#5ab4ac";
      } else if (gameCategory === "XOne") {
        return "#01665e";
      }
    })
    .attr("data-name", (data) => {
      return data["data"]["name"];
    })
    .attr("data-category", (data) => {
      return data["data"]["category"];
    })
    .attr("data-value", (data) => {
      return data["data"]["value"];
    })
    .attr("width", (data) => {
      return data["x1"] - data["x0"];
    })
    .attr("height", (data) => {
      return data["y1"] - data["y0"];
    })
    .on("mouseover", (event, data) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.text(
        data["data"]["name"] +
          " (" +
          data["data"]["category"] +
          ") - " +
          data["data"]["value"] +
          " million sales"
      );
      tooltip.attr("data-value", data["data"]["value"]);
    })
    .on("mouseout", (event, data) => {
      tooltip.transition().style("visibility", "hidden");
    });

  tile
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data((data) => {
      return data.data.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => {
      return 12 + i * 9;
    })
    .text((data) => {
      return data;
    });
}
