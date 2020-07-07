import * as d3 from 'd3'
export function draw (width, height, result, idSelect, uData, reData) {
    console.log(idSelect,width,height)
   var margin = {left:20,top:0,right:20,bottom:20},
    g_width = width - margin.left + margin.right,
    g_height = height - margin.top - margin.bottom;
    let maxPos = result.header.maxPos;
    let minPos = result.header.minPos;
    let normaldata = result.normalPosList;//散点
    let advancedPointList = result.advancedPointList
    let advancedCurveList = result.advancedCurveList
         //定义svg
    var svg = d3.select(idSelect)
        .append('svg')
        // 设置宽高
        .attr('width', width)
        .attr('height', height)
        //定义拖拽函数
    // var drag = d3.drag()
    //     .on("drag", dragmove, { passive: false })
    //     function dragmove(d){
    //         d3.select(this)
    //         .attr("cx", d.pos.x = d3.event.x)
    //         .attr("cy", d.pos.y = d3.event.y)
    //     }
    //定义g
    console.log(d3.select(idSelect))
    var g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    
    //定义缩放
    var scale_x = d3.scaleLinear()
        .domain([minPos.x, maxPos.x])
        .range([0,g_width]);
    var scale_y=d3.scaleLinear()
        .domain([minPos.y, maxPos.y])
        .range([0, g_height])
    //画散点
    svg.selectAll('circle')
        .data(normaldata)
        .enter()
        .append('circle')
        .attr('r', 1)
        .attr('fill', '#699')
        .attr('cx', function (d, i) {
            return margin.left + scale_x(d.x);
        })
        .attr('cy', function (d, i) {
            return height - margin.bottom - scale_y(d.y);
        });
    // 编辑线
    if (uData.length !== 0) {
        svg.selectAll('react')
            .data(uData)
            .enter()
            .append('line')
            .attr("x1",(d, i) => {
                return  margin.left + scale_x(d.startPos.pos.x)
            })
            .attr("y1",(d, i) => {
            return height - margin.bottom - scale_y(d.startPos.pos.y)
            })
            .attr("x2",(d, i) => {
            return  margin.left + scale_x(d.endPos.pos.x)
            })
            .attr("y2",(d, i) => {
            return height - margin.bottom - scale_y(d.endPos.pos.y)
            })
            .attr("stroke","red")
            .attr("stroke-width","1px")
    }
    // 绘制冲突域
    if (reData.length !== 0) {
        svg.selectAll("rect")
              .data(reData)
              .enter()
              .append("rect")
            .attr("x",function (d, i) {
                return scale_x(d.xleftpoint) + margin.left
            })//每个矩形的起始x坐标
            .attr("y",function(d,i){
                return scale_y(d.yleftpoint)
              })
            .attr("width",function(d){
                return scale_x(d.xbottompoint) - scale_x(d.xleftpoint)
              })
            .attr("height", function (d) {
                return Math.abs(scale_y(d.yleftpoint) - scale_y(d.ybottompoint))
            })//每个矩形的高度
            .attr("stroke","blue")
            .attr("fill","transparent")
            .attr("stroke-width","2px")
    }
    // 读取地图线
    svg.selectAll('react')
        .data(advancedCurveList)
        .enter()
        .append('line')
        .attr("x1",(d, i) => {
            return  margin.left + scale_x(d.startPos.pos.x)
        })
        .attr("y1",(d, i) => {
        return height - margin.bottom - scale_y(d.startPos.pos.y)
        })
        .attr("x2",(d, i) => {
        return  margin.left + scale_x(d.endPos.pos.x)
        })
        .attr("y2",(d, i) => {
        return height - margin.bottom - scale_y(d.endPos.pos.y)
        })
        .attr("stroke","red")
        .attr("stroke-width","1px")
        //   定义工具
    let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '9999999')
        .style('color', '#333')
        .style('visibility', 'hidden')   // 是否可见（一开始设置为隐藏）
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text('1111')
    // 画标记点
    g.selectAll('circle')
        .data(advancedPointList)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr('fill', '#990000')
        .attr('cx', function (d) {
            return scale_x(d.pos.x);
        })
        .attr('cy', function (d) {
            return height - margin.bottom - scale_y(d.pos.y);
        })
        .on('mouseover', function (d, i) {
            return tooltip.style('visibility', 'visible').text(d.instanceName)
        })
        .on('mousemove', function (d, i) {
            return tooltip.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
        }, { passive: false })
        .on('mouseout', function (d, i) {
            return tooltip.style('visibility', 'hidden')
        })
        // .call(drag)
  
    //设置xy轴
    var scale_z=d3.scaleLinear()
        .domain([minPos.y, maxPos.y])
        .range([g_height, 0])
    var x_axis = d3.axisBottom().scale(scale_x),
    y_axis = d3.axisLeft().scale(scale_z).ticks(7).tickValues([10,8,6,4,2,0,-2])
    //添加x轴
    g.append('g')
        .call(x_axis)
        // .attr('transform',`translate(0,${g_height})`)
        //添加y轴
    g.append('g')
        .call(y_axis)
        // .attr("transform", "rotate(-180)")
        // .attr('transform',`translate(0, 10)`)
}
