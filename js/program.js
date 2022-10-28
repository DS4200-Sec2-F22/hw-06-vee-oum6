// First, we need a frame
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom;


//Creating the frame -- scatterplot
const FRAME1 = d3.select("#scatterplot")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");


//Creating the frame -- scatterplot
const FRAME2 = d3.select("#scatterplot2")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame")

//Creating the frame -- bar chart plot
const FRAME3 = d3.select("#barchart")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

// build the scatterplot onto the canvas using the data in the given file 
function buildAllPlots() {
    // read data from the file 
    d3.csv("data/iris.csv").then((data) => {
        //checking the data is printing
        console.log(data)
        //find Max X & Y
        const X_MAX = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
        console.log(X_MAX)
        const X_SCALE = d3.scaleLinear()
            .domain([0, X_MAX + 1])
            .range([0, VIS_WIDTH]);
        const Y_MAX = d3.max(data, (d) => { return parseInt(d.Petal_Length); })
        console.log(Y_MAX)
        const Y_SCALE = d3.scaleLinear()
            .domain([0, Y_MAX + 1])
            .range([VIS_HEIGHT, 0]);
        const Scattercolor1 = d3.scaleOrdinal()
            .domain(["setosa", "versicolor", "virginica"])
            .range(["#2e8b57", "#ff7f50", "#40e0d0"])
        // make the x_axis 
        FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE).ticks(20))
            .attr("font-size", "10px");
        // make the Y-axis 
        FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE).ticks(20))
            .attr("font-size", "10px");
        // append all the points that are read in from the file 
        Frame1Points = FRAME1.selectAll("points")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", (d) => { return "(" + d.Sepal_Length + "," + d.Petal_Length + ")"; })
            .attr("cx", (d) => { return (MARGINS.left + X_SCALE(d.Sepal_Length)); })
            .attr("cy", (d) => { return (MARGINS.top + Y_SCALE(d.Petal_Length)); })
            .attr("r", 4)
            .style("fill", function (d) { return Scattercolor1(d.Species) })
            .attr("class", (d) => { return d.Species });

        //find Max X & Y
        const X_MAX2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
        console.log(X_MAX2)
        const X_SCALE2 = d3.scaleLinear()
            .domain([0, X_MAX2 + 1])
            .range([0, VIS_WIDTH]);
        const Y_MAX2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); })
        const Y_SCALE2 = d3.scaleLinear()
            .domain([0, Y_MAX2 + 1])
            .range([VIS_HEIGHT, 0]);
        //adding color based off species
        const Scattercolor2 = d3.scaleOrdinal()
            .domain(["setosa", "versicolor", "virginica"])
            .range(["#2e8b57", "#ff7f50", "#40e0d0"])
        // make the x_axis 
        FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE2).ticks(8))
            .attr("font-size", "10px");
        // make the Y-axis 
        FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE2).ticks(16))
            .attr("font-size", "10px");
        // append all the points that are read in from the file 
        Frame2Points = FRAME2.selectAll("points")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", (d) => { return "(" + d.Sepal_Width + "," + d.Petal_Width + ")"; })
            .attr("cx", (d) => { return (MARGINS.left + X_SCALE2(d.Sepal_Width)); })
            .attr("cy", (d) => { return (MARGINS.top + Y_SCALE2(d.Petal_Width)); })
            .attr("r", 4)
            .style("fill", function (d) { return Scattercolor2(d.Species) })
            .attr("class", (d) => { return d.Species });


        //FRAME 3

        const Barcolor = d3.scaleOrdinal()
            .domain(["setosa", "versicolor", "virginica"])
            .range(["#2e8b57", "#ff7f50", "#40e0d0"])
        //define scale functions that maps the data
        //x-axis
        const X_SCALE3 = d3.scaleBand()
            .domain(data.map(function (d) { return d.Species; })) // set domain using map fnction for categories
            .range([0, VIS_WIDTH])
            .padding(0.4);
        //find Max X
        const MAX_Y3 = d3.max(data, (d) => { return parseInt(d.count); })
        const Y_SCALE3 = d3.scaleLinear()
            .domain([0, 60])
            .range([VIS_HEIGHT, 100]);

        //add X_Scale and Y_Scale to plot bars
        Frame3Bars=FRAME3.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left); })
            .attr("y", Y_SCALE3(50) + MARGINS.top)
            .attr("height", VIS_HEIGHT - Y_SCALE3(50))
            .attr("width", X_SCALE3.bandwidth())
            .style("fill", function (d) { return Barcolor(d.Species) })
            .attr('class', 'bar');

        // add an xaxis to the vis
        FRAME3.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE3))
            .attr("font-size", "15px");

        // add an yaxis to the vis
        FRAME3.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE3))
            .attr("font-size", "15px");

        //Add BRUSHING and LINKING
        FRAME2.call(d3.brush()
            .extent([[MARGINS.left, MARGINS.top], [FRAME_WIDTH, (FRAME_HEIGHT - MARGINS.bottom)]])
            .on("brush", changeChart)
        )


        function changeChart(event) {

            // coordinates of the selected region
            const selection = event.selection;

            // empty set to store selected species names
            let selectedSpecies = new Set();

            // clears highlights when brush restarts
            if (selection === null) {
                Frame3Bars.classed('selected', false);
                Frame1Points.classed('selected', false);
                Frame2Points.classed("selected", false);
            } 
            // gives the border/opacity for all plots
            else {

                Frame2Points.classed("selected", (d) => {
                    isSelected = isBrushed(selection, (MARGINS.left + X_SCALE2(d.Sepal_Width)), (MARGINS.top + Y_SCALE2(d.Petal_Width)));
                    if (isSelected) {
                        selectedSpecies.add(d.Species);
                    }
                    return isSelected});

                // highlights corresponding points in the left plot
                Frame1Points.classed("selected", (d) => isBrushed(selection, (MARGINS.left + X_SCALE2(d.Sepal_Width)), (MARGINS.top + Y_SCALE2(d.Petal_Width))));
                
                // highlights bars based on class being in the selectedSpecies set
                Frame3Bars.classed("selected", (d) => {return selectedSpecies.has(d.Species);})
            };
        };

        // returns if a point is in the brush selection
        function isBrushed(brush_coords, cx, cy) {
            return brush_coords[0][0] <= cx && cx <= brush_coords[1][0] && brush_coords[0][1] <= cy && cy <= brush_coords[1][1];
        };

    });



};

buildAllPlots();