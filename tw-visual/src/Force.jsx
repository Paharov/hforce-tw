import React, { Component } from 'react';
import * as d3 from 'd3'

class Force extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamGen: props.streamGen,
            currencies: props.currencies,
            countries: props.countries,
            current: null,
            interval: props.interval
        }
        this.createBalls = this.createBalls.bind(this);
    }

    createBalls = () => {
        var width = 960,
            height = 500;

        var fill = d3.scale.category10();

        var nodes = [],
            foci = [{ x: 150, y: 150 }, { x: 350, y: 250 }, { x: 700, y: 400 }];

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0)
            .size([width, height])
            .on("tick", tick);

        var node = svg.selectAll("circle");

        function tick(e) {
            var k = .1 * e.alpha;

            // Push nodes toward their designated focus.
            nodes.forEach(function (o, i) {
                o.y += (foci[o.id].y - o.y) * k;
                o.x += (foci[o.id].x - o.x) * k;
            });

            node
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
        }

        setInterval(function () {
            nodes.push({ id: ~~(Math.random() * foci.length) });
            force.start();

            node = node.data(nodes);

            node.enter().append("circle")
                .attr("class", "node")
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", 8)
                .style("fill", function (d) { return fill(d.id); })
                .style("stroke", function (d) { return d3.rgb(fill(d.id)).darker(2); })
                .call(force.drag);
        }, 500);
    }


    componentDidMount() {
        this.createBalls();
    }
    render() {
        return (
            <svg width={this.props.width} height={this.props.height} ref={node => this.node = node}></svg>
        );
    }
}
export default Force;