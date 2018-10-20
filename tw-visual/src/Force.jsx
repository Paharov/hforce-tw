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
            svg: null,
            currNode: null,
            currencyMap: getCurrencyMap(props.currencies, 650, 450, 250)
        }
        this.createBalls = this.createBalls.bind(this);
        this.newBall = this.newBall.bind(this);
        this.doTick = this.doTick.bind(this);
    }

    createBalls = () => {
        var width = 960,
            height = 1000;

        var nodes = [],
            foci = getFoci(this.state.currencies.length, 650, 450, 250);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0)
            .size([width, height])
            .on("tick", this.doTick);

        force.start();

        var node = svg.selectAll("circle");

        this.setState({
            nodes: nodes,
            foci: foci,
            force: force,
            svg: svg,
            currNode: node
        })


    }

    doTick = (e) => {
        var k = .1 * e.alpha;

        // Push nodes toward their designated focus.
        let foci = this.state.foci;
        // console.log(foci);
        let node = this.state.currNode;
        let currencyMap = this.state.currencyMap;

        this.state.nodes.forEach(function (o, i) {
            // console.log(o);
            o.y += (currencyMap[o.id].y - o.y) * k;
            o.x += (currencyMap[o.id].x - o.x) * k;
        });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    newBall = () => {

        const srcCoords = this.state.currencyMap[this.state.current.src_currency];
        const tgtCoords = this.state.currencyMap[this.state.current.tgt_currency];

        console.log(this.state.currencyMap)

        this.state.nodes.push({ id: this.state.current.tgt_currency });
        this.state.force.start();

        const node = this.state.currNode.data(this.state.nodes);

        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) { return srcCoords.x; })
            .attr("cy", function (d) { return srcCoords.y; })
            .attr("r", 8)
            .style("fill", srcCoords.color)
            .call(this.state.force.drag);

        this.setState({
            currNode: node
        })
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
        if (this.state.current !== null) {
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