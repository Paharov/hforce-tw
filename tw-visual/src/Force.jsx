import React, { Component } from 'react';
import * as d3 from 'd3'
import { getFoci, getCurrencyMap } from './helper/foci.js'; 

class Force extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: props.currencies,
            countries: props.countries,
            current: props.current,
            interval: props.interval,
            nodes: null,
            foci: null,
            force: null,
            svg: null
        }
        this.createBalls = this.createBalls.bind(this);
        this.newBall = this.newBall.bind(this);
    }

    createBalls = () => {
        var width = 960,
            height = 1000;

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

        force.start();
        
        var node = svg.selectAll("circle");

        this.setState({
            nodes: nodes,
            foci: foci,
            force: force,
            svg: svg
        })

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
    }

    newBall = () => {

        let src = this.state.current ? this.state.current.src_currency : "no";
        let dest = this.state.current ? this.state.current.tgt_currency : "no";

        console.log(src);
        console.log(dest);
        console.log(this.state.current);
        let currMap = getCurrencyMap(this.state.currencies);
        console.log(currMap);
        let coords = currMap[src];
        console.log(coords)

        var node = this.state.svg.selectAll("circle");

        this.state.nodes.push({ id: ~~(Math.random() * this.state.foci.length) });
        this.state.force.start();

        node = node.data(this.state.nodes);
                
        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) { return coords.x; })
            .attr("cy", function (d) { return coords.y; })
            .attr("r", 8)
            .style("fill", "red")
            .call(this.state.force.drag);
    }

    componentDidMount() {
        this.createBalls();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currencies: nextProps.currencies,
            countries: nextProps.countries,
            current: nextProps.current
        })
        if (this.state.current) {
            this.newBall();
        }
    }

    render() {
        return (
            <svg width="100%" height="100%" ref={node => this.node = node}></svg>
        );
    }
}
export default Force;