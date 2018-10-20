import React, { Component } from 'react';
import * as d3 from 'd3';
import { getFoci, getCurrencyMap } from './helper/foci.js';
import { getRatesMap, calculateCircleSize } from './helper/converter.js';

class Force extends Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
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
            rates: null,
            height: props.height,
            width: props.width,
            currencyMap: getCurrencyMap(props.currencies, props.width / 2, (props.height / 2) + props.height * 0.2, Math.min(props.width, props.height) / 3)
        }
        this.createBalls = this.createBalls.bind(this);
        this.newBall = this.newBall.bind(this);
        this.doTick = this.doTick.bind(this);
    }

    createBalls = () => {
        var width = this.state.width,
            height = this.state.height;

        var nodes = [],
            foci = getFoci(this.state.currencies.length, width / 2, (height / 2) + height * 0.2, Math.min(width, height) / 3).foci;

        var svg = d3.select(this.nodeRef.current.nodeName).append("svg")
            .attr("id", "mainSvg")
            .attr("width", width + width * 0.4)
            .attr("height", height + height * 0.4);

        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0.02)
            .size([width, height])
            .on("tick", this.doTick);

        var currMap = this.state.currencyMap;

        Object.keys(currMap).forEach(
            key => {
                d3.select("#mainSvg")
                    .append("text")
                    .attr("x", currMap[key].labelX)
                    .attr("y", currMap[key].labelY)
                    .style("font-size", "0.5em")
                    .text(key)
            });

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
        var k = .05 * e.alpha;

        // Push nodes toward their designated focus.
        let node = this.state.currNode;
        let currencyMap = this.state.currencyMap;

        this.state.nodes.forEach(function (o, i) {
            o.y += (currencyMap[o.id].y - o.y) * k;
            o.x += (currencyMap[o.id].x - o.x) * k;
        });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    newBall = () => {     
        
        console.log(this.state.current)
        const srcCoords = this.state.currencyMap[this.state.current.src_currency];
        console.log(srcCoords);

        this.state.nodes.push({ id: this.state.current.tgt_currency });
        this.state.force.start();

        const node = this.state.currNode.data(this.state.nodes);

        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", srcCoords.x )
            .attr("cy", srcCoords.y )
            .attr("r", calculateCircleSize(this.state.current.source_amount, 
                                        this.state.rates[this.state.current.src_currency]))
            .style("fill", srcCoords.color)
            .append("title")
            .text(this.state.current.src_currency + " => " + this.state.current.tgt_currency)
            .call(this.state.force.drag);

        this.setState({
            currNode: node
        })
    }

    componentDidMount() {
        this.createBalls();
        this.setState({
            rates: getRatesMap(this)
        })
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
            <div ref={this.nodeRef}/>
        );
    }
}
export default Force;