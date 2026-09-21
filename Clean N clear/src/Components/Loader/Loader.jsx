import React, { useEffect, useRef, useState } from "react";
import "./Loader.css";

/* =====================================================
   SPEED
   ===================================================== */

const FPS = 45;


/* =====================================================
   GET ALL FRAMES
   ===================================================== */

const frameFiles = import.meta.glob(
  "./frames/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
    query: "?url",
  }
);


/* =====================================================
   SORT FRAMES
   ===================================================== */

const frames = Object.entries(frameFiles)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  )
  .map(([, url]) => url);


/* =====================================================
   LOADER
   ===================================================== */

const Loader = ({ onComplete }) => {

  const imageCache = useRef([]);

  const [currentFrame, setCurrentFrame] = useState(0);

  const [firstFrameReady, setFirstFrameReady] =
    useState(false);


  /* ===================================================
     LOAD FIRST FRAME IMMEDIATELY
     =================================================== */

  useEffect(() => {

    if (!frames.length) {
      console.error(
        "No frames found inside Loader/frames/"
      );
      return;
    }


    const firstImage = new Image();


    firstImage.onload = () => {

      imageCache.current[0] = firstImage;

      setFirstFrameReady(true);

    };


    firstImage.onerror = () => {

      console.error(
        "First loader frame could not be loaded."
      );

    };


    firstImage.src = frames[0];


  }, []);


  /* ===================================================
     LOAD REMAINING FRAMES IN BACKGROUND
     =================================================== */

  useEffect(() => {

    if (!firstFrameReady) return;


    let active = true;


    const loadRemainingFrames = async () => {

      for (let i = 1; i < frames.length; i++) {

        if (!active) return;


        await new Promise((resolve) => {

          const image = new Image();


          image.onload = () => {

            imageCache.current[i] = image;

            resolve();

          };


          image.onerror = () => {

            console.error(
              "Could not load frame:",
              frames[i]
            );

            resolve();

          };


          image.src = frames[i];

        });

      }

    };


    loadRemainingFrames();


    return () => {

      active = false;

    };

  }, [firstFrameReady]);


  /* ===================================================
     PLAY ANIMATION
     =================================================== */

  useEffect(() => {

    if (!firstFrameReady) return;


    let active = true;

    let frameIndex = 0;

    let lastTime = 0;

    const frameDuration = 1000 / FPS;


    const play = (time) => {

      if (!active) return;


      if (
        time - lastTime >= frameDuration
      ) {

        /*
         * Only move to a frame when
         * that frame has actually loaded.
         */

        if (imageCache.current[frameIndex]) {

          setCurrentFrame(frameIndex);

          frameIndex++;

        }


        /*
         * Finished all frames
         */

        if (
          frameIndex >= frames.length
        ) {

          active = false;


          setTimeout(() => {

            if (onComplete) {
              onComplete();
            }

          }, 100);

          return;

        }


        lastTime = time;

      }


      requestAnimationFrame(play);

    };


    requestAnimationFrame(play);


    return () => {

      active = false;

    };

  }, [firstFrameReady, onComplete]);


  /* ===================================================
     DISPLAY
     =================================================== */

  return (

    <div className="clean-n-clear-loader">

      {frames.length > 0 &&
        imageCache.current[currentFrame] && (

          <img
            src={
              imageCache.current[
                currentFrame
              ].src
            }
            alt=""
            className="clean-n-clear-loader-frame"
            draggable="false"
          />

        )}

    </div>

  );

};


export default Loader;