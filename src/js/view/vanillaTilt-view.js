/**
 * Визуальная сторонняя библиотека.
 */

import "../../assets/lib/vanilla-tilt";

/* global VanillaTilt */
/* eslint no-undef: "error" */
const vanillaTiltView = (destroyBox) => {
  const settings = {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 1 
    };
  
  const init = () => VanillaTilt.init(destroyBox, settings);
  init();
};

export default vanillaTiltView;