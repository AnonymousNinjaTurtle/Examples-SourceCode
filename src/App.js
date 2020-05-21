import React, { Component } from "react";
import "./App.css";

// load some Images;
import VOWL_PipelineCode from "./Code_VowlPipe.png";
import SPARQL_PipelineCode from "./Code_SPARQLPipeline.png";
import RDF_PipelineCode from "./Code_RDFStyledPipeline.png";
import Schematic_Overview from "./NodeLinkPipeline.png";

// loading static data as json objects >> Simulating data access (HERE for ISWC 2020 Submission)
import * as inputSPARQLDataAsJSON from "./inputSPARQL.json";
import * as inputVOWLDataAsJSON from "./inputVOWL.json";

// loading the two different parser components
import SparqlParser from "./Implementation/Parsers/SparqlParser";
import VOWL_Parser from "./Implementation/Parsers/VOWLParser";

// loading two vertex mappers (one for vowl and one for sparql data)
import VOWL_VertexEdgeMapper from "./Implementation/Mappers/VOWL-VertexEdgeMapper";
import Sparql_VertexEdgeMapper from "./Implementation/Mappers/SPARQL-VertexEdgeMapper";

// loading three node link mappers
import VOWL_NodeLinkMapper from "./Implementation/Mappers/VOWL-NodeLinkMapper";
import RDF_NodeLinkMapper from "./Implementation/Mappers/RDF-NodeLinkMapper";
import SPARQL_NodeLinkMapper from "./Implementation/Mappers/SPARQL-NodeLinkMapper";

import VOWLRenderer from "./Implementation/Renderes/gizmoRenderer/vowlGraph";
import SPARQLRenderingHandler from "./Implementation/Renderes/gizmoRenderer/renderingConfigs/SPARQLRenderingHandler";
import VOWLRenderingHandler from "./Implementation/Renderes/gizmoRenderer/renderingConfigs/VOWLRenderingHandler";
import RDFStyledRenderingHandler from "./Implementation/Renderes/gizmoRenderer/renderingConfigs/RDFStyledRenderingHandler";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRenderVisualization: false
    };
  }

  componentDidMount() {
    this.VOWL_Pipeline().then(() => {
      this.RDFStyled_Pipeline().then(() => {
        this.SPARQL_Pipeline().then();
      });
    });
  }

  // ********************************************************************************************************************
  SPARQL_Pipeline = async () => {
    // Component instantiation
    const parser = new SparqlParser();
    const mapper_1 = new Sparql_VertexEdgeMapper();
    const mapper_2 = new SPARQL_NodeLinkMapper();
    const renderingModule = new VOWLRenderer();

    const nestedVisualizationConfig = new SPARQLRenderingHandler();

    // tell the renderer to use a specific rendering handler;
    renderingModule.setRenderingConfig(nestedVisualizationConfig);
    // execute the pipeline
    /** ------------ Data Access 'module' -------------------------**/
    // NOTE: This examples do not employ the data access handler
    // Input data is pre-fetched to make it possible to release these examples on GitHub (as GitHub pages)
    parser.setInputData(inputSPARQLDataAsJSON.default); // << HERE WE SET THE RESULT AS JSON
    await parser.execute();

    /** ------------ Mapper 'module' -------------------------**/
    mapper_1.setInputData(parser.getResult());
    await mapper_1.execute();

    mapper_2.setInputData(mapper_1.getResult());
    await mapper_2.execute();

    /** ------------ Rendering  'module' -------------------------**/
    renderingModule.setRenderingContainer("GraphRenderingDiv3"); // set div for rendering
    renderingModule.setModel(mapper_2.getResult().resultingModel.getResult()); // set node-link model
    // do the rendering magic
    renderingModule.initializeRenderingContainer();
    renderingModule.createRenderingElements();
    renderingModule.drawRenderingPrimitives();
  };

  // ********************************************************************************************************************
  VOWL_Pipeline = async () => {
    // Component instantiation
    const parser = new VOWL_Parser();
    const mapper_1 = new VOWL_VertexEdgeMapper();
    const mapper_2 = new VOWL_NodeLinkMapper();
    const renderingModule = new VOWLRenderer();
    const nativeVOWLRenderingConfig = new VOWLRenderingHandler();

    // tell the renderer to use a specific rendering handler;
    renderingModule.setRenderingConfig(nativeVOWLRenderingConfig);

    // NOTE: This examples do not employ the data access handler
    // Input data is pre-fetched to make it possible to release these examples on GitHub (as GitHub pages)
    /** ------------ Data Access Module-----------------------**/
    const deepCopy = JSON.parse(JSON.stringify(inputVOWLDataAsJSON.default));
    parser.setInputData(deepCopy); // << HERE WE SET THE RESULT AS JSON

    await parser.execute();

    /** ------------ Mapper Module  -------------------------**/
    mapper_1.setInputData(parser.getResult());
    await mapper_1.execute();

    mapper_2.setInputData(mapper_1.getResult());
    await mapper_2.execute();

    /** ------------ Rendering Module -----------------------**/
    renderingModule.setRenderingContainer("GraphRenderingDiv"); // set div for rendering
    renderingModule.setModel(mapper_2.getResult().resultingModel.getResult()); // set node-link model
    // do the rendering magic
    renderingModule.initializeRenderingContainer();
    renderingModule.createRenderingElements();
    renderingModule.drawRenderingPrimitives();
  };

  // ********************************************************************************************************************
  RDFStyled_Pipeline = async () => {
    // Component instantiation
    const parser = new VOWL_Parser(); // using the same vowlParser
    const mapper_1 = new VOWL_VertexEdgeMapper(); // using the vowl vertexEdge mapper
    const mapper_2 = new RDF_NodeLinkMapper(); // using RDF-Styled Mapper
    const renderingModule = new VOWLRenderer();

    const AuxiliariesNodeRenderingConfig = new RDFStyledRenderingHandler();

    // tell the renderer to use a specific rendering handler;
    renderingModule.setRenderingConfig(AuxiliariesNodeRenderingConfig);

    // NOTE: This examples do not employ the data access handler
    // Input data is pre-fetched to make it possible to release these examples on GitHub (as GitHub pages)
    /** ------------ Data Access 'module' -------------------------**/
    const deepCopy = JSON.parse(JSON.stringify(inputVOWLDataAsJSON.default));
    parser.setInputData(deepCopy); // << HERE WE SET THE RESULT AS JSON
    await parser.execute();

    /** ------------ Mapper 'module' -------------------------**/
    mapper_1.setInputData(parser.getResult());
    await mapper_1.execute();

    mapper_2.setInputData(mapper_1.getResult());
    await mapper_2.execute();

    /** ------------ Rendering  'module' -------------------------**/
    renderingModule.setRenderingContainer("GraphRenderingDiv2"); // set div for rendering
    renderingModule.setModel(mapper_2.getResult().resultingModel.getResult()); // set node-link model
    // do the rendering magic
    renderingModule.initializeRenderingContainer();
    renderingModule.createRenderingElements();
    renderingModule.drawRenderingPrimitives();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Schematic overview
        <body className="App-header">
        <div>
          <img src={Schematic_Overview} width="80%" alt="logo" />
        </div>
        </body>
        </header>
        <header className="App-header">
          Example 1) VOWL Visualization Pipeline
          <div
            id="GraphRenderingDiv"
            style={{
              width: "80%",
              height: "400px",
              backgroundColor: "#ccc",
              margin: "20px",
              paddingTop: "0"
            }}
          />
        </header>
        <body className="App-header">
          <div>
            <img src={VOWL_PipelineCode} width="100%" alt="logo" />
          </div>
        </body>
        <header className="App-header">
          Example 2) Modified VOWL Visualization Pipeline (adding auxiliary
          nodes)
          <div
            id="GraphRenderingDiv2"
            style={{
              width: "80%",
              height: "400px",
              backgroundColor: "#ccc",
              margin: "20px",
              paddingTop: "0"
            }}
          />
        </header>
        <body className="App-header">
          <div>
            <img src={RDF_PipelineCode} width="100%" alt="logo" />
          </div>
        </body>
        <header className="App-header">
          Example 3) SPARQL Query Visualization (Nested UML-style)
          <div
            id="GraphRenderingDiv3"
            style={{
              width: "80%",
              height: "400px",
              backgroundColor: "#ccc",
              margin: "20px",
              paddingTop: "0"
            }}
          />
        </header>
        <body className="App-header">
          <div>
            <img src={SPARQL_PipelineCode} width="100%" alt="logo" />
          </div>
        </body>
      </div>
    );
  }
}

export default App;
