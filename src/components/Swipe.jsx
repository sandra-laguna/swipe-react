import { useState, useRef } from "react";

import styles from "./Swipe.module.scss";

export const Swipe = () => {
  /* Swipe */
  const slider = useRef(null);
  const content = useRef(null);

  // set up our state
  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID,
    currentIndex = 0;

  const getPositionY = (event) => {
    return event.touches[0].clientY;
  };

  // use a HOF so we have index in a closure
  const touchStart = (index) => {
    return (event) => {
      currentIndex = index;
      startPos = getPositionY(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
    };
  };

  const touchMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionY(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  };

  const touchEnd = () => {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) currentIndex += 1;

    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const setPositionByIndex = () => {
    currentTranslate = currentIndex * -content.current.clientHeight;
    prevTranslate = currentTranslate;
    setSliderPosition();
  };

  const setSliderPosition = () => {
    if (slider.current) {
      slider.current.style.transform = `translateY(${currentTranslate}px)`;
    }
    /* slider.style.transform = `translateY(${currentTranslate}px)` */
  };

  return (
    <main>
      <div className={styles.sliderContainer} ref={slider}>
        <div
          className={styles.slide}
          onTouchStart={touchStart(0)}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        >
          <div className={styles.slideLine}></div>
        </div>
        <div className={styles.content} ref={content}>
          <p>Content</p>
        </div>
      </div>
    </main>
  );
};
