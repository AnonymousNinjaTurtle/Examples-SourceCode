import BasePrimitive from './BasePrimitive';
import DrawTools from '../DrawTools';
export default class NodePrimitive extends BasePrimitive {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;

    this.incomingLinks = [];
    this.outgoingLinks = [];
    this.__numberOfLoops = 0;
  }

  addIncomingLink = link => {
    this.incomingLinks.push(link);
  };
  addOutgoingLink = link => {
    this.outgoingLinks.push(link);
  };

  setPosition = (x, y) => {
    this.x = x;
    this.y = y;
  };

  numberOfLoops(val) {
    if (!arguments.length) {
      return this.__numberOfLoops;
    }
    this.__numberOfLoops = val;
  }

  updateRenderingPosition = () => {
    if (this.groupRoot) {
      this.groupRoot.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
    }
    // update all related links; (using concat as temp object to merge the links)
    this.incomingLinks.concat(this.outgoingLinks).forEach(l => {
      l.updateRenderingPosition();
    });
  };

  // this one will get the draw Functions replacement!
  render = groupRoot => {
    this.groupRoot = groupRoot;

    // handle rendering based on the config;
    const renderingElements = this.drawTools().renderNode(this.groupRoot, this.renderingConfig(), this);
    this.renderingShape = renderingElements.renderingShape;
    this.renderingText = renderingElements.renderingText;

    //   this.renderingElement = DrawTools().drawElement(this.svgRoot, this.configObject, this);
    //   this.renderingText = this.drawLabelText(this.svgRoot, this.label);
    //   this.renderingElement.append('title').text(this.label);
    //   this.updateTextPosition();
    // }

    this.updateRenderingPosition();
  };
}
