import { useState, useRef } from "react";

import styles from "./Swipe.module.scss";

export const Swipe = () => {
  const slider = useRef(null);
  const content = useRef(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      console.log("swipe up");
      slider.current.style.transform = `translateY(-${content.current.clientHeight}px)`;
    }

    if (isDownSwipe) {
      console.log("swipe down");
      slider.current.style.transform = `translateY(0px)`;
    }
  };

  return (
    <main>
      <div className={styles.sliderContainer} ref={slider}>
        <div
          className={styles.slide}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
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
