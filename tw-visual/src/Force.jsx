import React, { Component } from 'react';
import * as d3 from 'd3';
import { getFoci, getCurrencyMap } from './helper/foci.js';
import { getRatesMap, calculateCircleSize } from './helper/converter.js';
import tw_flag from './images/tw_flag.png';

class Force extends Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
        this.state = {
            currencies: props.currencies,
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
            currencyMap: getCurrencyMap(props.currencies, props.width / 2, (props.height / 2) + props.height * 0.2, Math.min(props.width, props.height) / 2.2)
        }
        this.createBalls = this.createBalls.bind(this);
        this.newBall = this.newBall.bind(this);
        this.doTick = this.doTick.bind(this);
        this.scheduleBallExecution = this.scheduleBallExecution.bind(this);
    }

    createBalls = () => {
        var width = this.state.width,
            height = this.state.height;

        var nodes = [],
            foci = getFoci(this.state.currencies.length, width / 2, (height / 2) + height * 0.2, Math.min(width, height) / 2.2).foci;

        var svg = d3.select(this.nodeRef.current.nodeName).append("svg")
            .attr("id", "mainSvg")
            .attr("width", "100%")
            .attr("height", height * 1.4)
            .style("background-color", "#faf2f2");

        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .friction(0.1)
            .charge(-400)
            .gravity(0.005)
            .size([width, height])
            .on("tick", this.doTick);

        var currMap = this.state.currencyMap;

        Object.keys(currMap).forEach(
            key => {
                d3.select("svg")
                    .append("rect")
                    .attr("x", currMap[key].labelX - 24)
                    .attr("y", currMap[key].labelY - 31)
                    .attr("width", "80")
                    .attr("height", "50")
                    .attr("rx", "20px")
                    .attr("ry", "20px")
                    .attr("fill", currMap[key].color)
                    .style("opacity", "0.65")
            }
        )

        Object.keys(currMap).forEach(
            key => {
                d3.select("svg")
                    .append("text")
                    .attr("class", "labelElement")
                    .attr("x", currMap[key].labelX)
                    .attr("y", currMap[key].labelY)
                    .style("font-family", "Ubuntu")
                    .style("font-weight", "bold")
                    .style("font-size", "1.1em")
                    .style("fill", "#37517e")
                    .text(key)
            }
        )

        d3.select("svg")
            .append("svg:image")
            .attr('x', "44%")
            .attr('y', "42%")
            .attr('width', "15%")
            .attr('height', "15%")
            .attr("xlink:href", tw_flag)

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
        var k = 0.05;

        // Push nodes toward their designated focus.
        let node = this.state.currNode;
        let currencyMap = this.state.currencyMap;

        this.state.nodes.forEach(function (o, i) {
            o.y += (currencyMap[o.id[1]].y - o.y) * k;
            o.x += (currencyMap[o.id[1]].x - o.x) * k;
        });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    scheduleBallExecution = (ball) => {
        setTimeout(function() {
            ball.remove()
        }, this.state.interval * 50)
    }

    scheduleTargetChange = (ball, n) => {
        setTimeout(function() {
            console.log(ball, n)
            var temp = ball[n-1].__data__.id[0]
            ball[n-1].__data__.id[0] = ball[n-1].__data__.id[1]
            ball[n-1].__data__.id[1] = temp
            ball[n-1].style.visibility = "visible"
        }, this.state.interval * 5)
    }

    newBall = () => {     

        const srcCoords = this.state.currencyMap[this.state.current.src_currency];


        this.state.nodes.push({ id: [this.state.current.tgt_currency, this.state.current.src_currency] });

        this.state.force.start();

        const node = this.state.currNode.data(this.state.nodes);

        var width = this.state.width
        var height = this.state.height

        let circleSelection = node.enter().insert("circle", ".labelElement");
        circleSelection
            .attr("class", "node")
            .attr("x", srcCoords.x )
            .attr("y", srcCoords.y )
            .attr("r", calculateCircleSize(this.state.current.source_amount, 
                                        this.state.rates[this.state.current.src_currency]))
            .style("fill", srcCoords.color)
            .style("visibility", "hidden")
            .append("title")
            .text(this.state.current.src_currency + " => " + this.state.current.tgt_currency)
            .call(this.state.force.drag());

        this.scheduleTargetChange(circleSelection[0], circleSelection[0].length);
        this.scheduleBallExecution(circleSelection);
        this.setState({
            currNode: node
        })
    }

    componentDidMount() {
        this.createBalls();
        getRatesMap(this);
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

    styles = {
        logo: {
            size: "20px",
            marginLeft: 10,
            marginRight: 20,
            marginBottom: 10
        }
    }

    render() {
        return (
            <div ref={this.nodeRef}/>
        );
    }
}
export default Force;