import React from 'react';

if (process.browser) {
  require('../../../lib/tag-cloud');
}

// eslint-disable-next-line
const skills = [
  'Javascript',
  'Typescript',
  'Python',
  'Angular',
  'React',
  'JQuery',
  'HTML',
  'CSS',
  'Styled-components',
  'Material-Design',
  'GraphQL',
  'REST',
  'MongoDB',
  'PostgreSQL',
  'NodeJS',
  'Microservices',
  'RxJS',
  'DevOps',
  'AWS',
  'Google Cloud',
  'Firebase',
  'Data Visualization',
  'Design Patterns',
  'Progressive Web Apps'
];

class WordCloud extends React.Component {
  renderTagCloud() {
    if (process.browser) {
      try {
        // eslint-disable-next-line
        TagCanvas.Start('myCanvas', 'tags', {
          textColour: '#08fdd8',
          outlineColour: '#ff00ff',
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05
        });
      } catch (e) {
        // something went wrong, hide the canvas container
        document.getElementById('myCanvasContainer').style.display = 'none';
      }
    }
  }

  componentDidMount() {
    this.renderTagCloud();
  }

  componentWillUnmount() {}

  doNothing(e) {
    e.preventDefault();
  }

  render() {
    const listItems = skills.map((name, index) => (
      <li key={index}>
        <a onClick={this.doNothing}>{name}</a>
      </li>
    ));
    return (
      <>
        <div id="myCanvasContainer" style={{ background: '#000' }}>
          <canvas width="600" height="600" id="myCanvas">
            <p>Anything in here will be replaced on browsers that do not support the canvas element</p>
          </canvas>
        </div>
        <div id="tags">
          <ul>{listItems}</ul>
        </div>
      </>
    );
  }
}

export default WordCloud;
