import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Topic, GraphNode, GraphLink } from '../types';
import { MOCK_TOPICS, MOCK_LINKS } from '../constants';

interface TopicGraphProps {
  onTopicSelect: (topic: Topic) => void;
  darkMode: boolean;
}

export const TopicGraph: React.FC<TopicGraphProps> = ({ onTopicSelect, darkMode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); 

    // Define Filters for Glow
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    
    filter.append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const nodes: GraphNode[] = MOCK_TOPICS.map(t => ({
      id: t.id,
      group: t.category,
      val: t.activityLevel,
      data: t
    }));

    const links: GraphLink[] = MOCK_LINKS.map(l => ({ ...l }));

    // Nuanced Color Scale
    const colorScale = d3.scaleOrdinal()
      .domain(['Politics', 'Technology', 'Environment', 'Science', 'Bioethics', 'Economics', 'Culture'])
      .range([
          '#f43f5e', // Politics (Red/Rose)
          '#0ea5e9', // Technology (Sky Blue)
          '#10b981', // Environment (Emerald)
          '#8b5cf6', // Science (Violet)
          '#ec4899', // Bioethics (Pink)
          '#f59e0b', // Economics (Amber)
          '#6366f1'  // Culture (Indigo)
      ]);

    const sizeScale = d3.scaleLinear()
      .domain([0, 100])
      .range([15, 50]);

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(180))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => sizeScale(d.val) + 20));

    // Links (Energy lines)
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', darkMode ? '#ffffff' : '#000000')
      .attr('stroke-opacity', darkMode ? 0.15 : 0.1)
      .attr('stroke-width', 1.5);

    // Node Group
    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d) => onTopicSelect(d.data))
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Glow Circle (Outer)
    nodeGroup.append('circle')
      .attr('r', d => sizeScale(d.val))
      .attr('fill', (d: any) => colorScale(d.group) as string)
      .attr('opacity', 0.2)
      .attr('filter', 'url(#glow)');

    // Main Circle
    nodeGroup.append('circle')
      .attr('r', d => sizeScale(d.val) * 0.7)
      .attr('fill', (d: any) => colorScale(d.group) as string)
      .attr('stroke', darkMode ? '#171717' : '#ffffff')
      .attr('stroke-width', 2)
      .attr('class', 'transition-all duration-300 hover:brightness-125');

    // Labels
    nodeGroup.append('text')
      .text(d => d.data.title)
      .attr('dy', d => sizeScale(d.val) + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', darkMode ? '#e5e5e5' : '#171717')
      .attr('font-size', '11px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', '500')
      .attr('opacity', 0.9)
      .style('pointer-events', 'none');
    
    // Category Icon (First Letter)
    nodeGroup.append('text')
      .text(d => d.data.category.substring(0, 1))
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', d => sizeScale(d.val) * 0.35 + 'px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeGroup
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [dimensions, onTopicSelect, darkMode]);

  return (
    <div ref={wrapperRef} className="w-full h-[calc(100vh-80px)] relative overflow-hidden">
      <div className="absolute top-12 left-8 md:left-12 z-10 w-full pointer-events-none pr-8">
        <h1 className="text-4xl md:text-6xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-4 whitespace-nowrap">
            Constellation of Debates
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
            Explore the interconnected landscape of public discourse. Nodes represent active debates; energy flows between related concepts.
        </p>
      </div>
      
      {/* Categories Legend */}
      <div className="absolute bottom-8 right-8 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-neutral-200 dark:border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">Themes</div>
          <div className="flex flex-col gap-2.5">
              {[
                  {c: '#f43f5e', l: 'Politics'},
                  {c: '#0ea5e9', l: 'Technology'},
                  {c: '#10b981', l: 'Environment'},
                  {c: '#8b5cf6', l: 'Science'},
                  {c: '#ec4899', l: 'Bioethics'},
                  {c: '#f59e0b', l: 'Economics'},
                  {c: '#6366f1', l: 'Culture'},
              ].map(item => (
                  <div key={item.l} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.3)]" style={{backgroundColor: item.c}}></div>
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{item.l}</span>
                  </div>
              ))}
          </div>
      </div>

      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
    </div>
  );
};