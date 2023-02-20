import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

function Guide({ steps, onGuideComplete }) {
  useEffect(() => {
    const intro = introJs();
    intro.setOptions({ steps });
    intro.oncomplete(onGuideComplete);
    intro.start();

    return () => {
      intro.exit();
    };
  }, [steps, onGuideComplete]);

  return null;
}

Guide.propTypes = {
  steps: PropTypes.array.isRequired,
  onGuideComplete: PropTypes.func.isRequired,
};

export default Guide;
