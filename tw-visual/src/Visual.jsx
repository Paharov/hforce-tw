import testStream from './TestStream'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { force } from 'd3-force'
import * as d3 from 'd3'
import React, { Component } from 'react';

class Visual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            streamGen: testStream(),
            current: null,
            interval: 1000
        }
        this.createBalls = this.createBalls.bind(this);
    }

    getInterval = () => {
        return Math.floor(Math.random() * this.state.interval) + (this.state.interval / 0.5)
    }

    createBalls = () => {
        var width = 960,
            height = 500;

        var fill = scaleLinear().category10();

        var nodes = [],
            foci = [{ x: 150, y: 150 }, { x: 800, y: 400 }, { x: 500, y: 400 }];

        var svg = select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = force
            .nodes(nodes)
            .links([])
            .gravity(0.05)
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
        setInterval(() => {
            this.setState({
                current: this.state.streamGen.next().value
            })
        }, this.getInterval())
        this.createBalls();
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.state.current ? this.state.current.recipient.first_name : ""}</h1>
                <svg width={400} height={300} ref={node => this.node = node}></svg>
            </React.Fragment>
        );
    }
}

export default Visual;