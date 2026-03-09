import React, { useEffect, useState } from 'react';

export const CompLoading: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");

    // The animation cycle is 7.5 seconds total:
    // 0.0s - 2.5s: Draw line (2.5s duration)
    // 2.5s - 3.0s: Fill color
    // 3.0s - 4.5s: Hold filled state (Checking if loaded)
    // 4.5s - 5.0s: Unfill color
    // 5.0s - 7.5s: Erase line
    
    // Set minimum display time to 3.5s so it reaches the first "Filled" state before fading out
    const minDisplayTime = new Promise((resolve) => setTimeout(resolve, 3500));
    
    const waitForFontsAndLoad = new Promise((resolve) => {
      const finish = () => resolve(null);
      if (document.readyState === "complete") {
        document.fonts.ready.then(finish);
      } else {
        window.addEventListener("load", () => {
          document.fonts.ready.then(finish);
        }, { once: true });
      }
    });

    Promise.all([minDisplayTime, waitForFontsAndLoad]).then(() => {
      setFadeOut(true);
      setTimeout(() => {
        document.body.classList.remove("loading");
        setVisible(false);
      }, 1000); // Allow fade out transition
    });
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="content-wrapper">
        <div className="logo-box">
          <svg 
            className="sdc-logo-svg"
            viewBox="170 130 760 760"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1.3333333,0,0,-1.3333333,608.814,755.95427)">
              <path 
                className="sdc-logo-path-animated"
                d="m 0,0 c 17.847,13.252 31.413,30.844 39.383,51.133 2.624,6.682 9.334,25.264 7.278,49.266 L 150.031,0 Z M 189.05,0 13.065,170.926 c -3.413,3.61 -7.142,7.218 -11.219,10.808 -18.305,16.126 -44.357,40.531 -47.491,74.333 -3.435,37.016 21.32,63.519 49.902,67.166 12.336,1.572 23.814,0.658 37.146,-3.21 8.557,-2.484 12.376,-4.338 16.622,-0.77 2.899,2.428 3.435,7.688 -0.373,11.817 -34.214,37.039 -108.966,83.011 -206.251,56.872 -41.703,-11.208 -83.695,-38.84 -112.965,-79.902 -70.909,-99.583 -28.296,-209.367 9.017,-251.227 8.137,-10.51 17.237,-19.096 22.54,-23.733 2.711,-2.396 6.038,-1.571 7.294,1.234 20.426,45.322 52.049,104.096 132.186,133.546 3.921,1.421 4.677,3.556 -1.288,3.155 -89.72,-6.096 -134.894,-77.661 -134.894,-77.661 -31.699,43.745 -35.969,90.044 -30.834,126.156 l 39.961,-73.309 -30.375,100.715 68.815,-65.14 -0.061,0.648 -58.509,95.398 18.026,25.872 117.569,-10.475 0.556,0.21 -93.17,36.725 c 0.18,0.148 0.367,0.297 0.548,0.446 l 96.962,4.628 0.087,0.16 -69.424,13.676 c 8.188,4.394 17.345,8.465 27.534,11.881 82.711,27.684 147.154,-18.804 145.764,-18.734 -45.605,2.239 -94.7,-31.248 -92.764,-87.63 1.524,-44.016 27.59,-69.701 56.812,-97.446 C 4.695,124.941 17.498,89.267 5.455,54.265 -5.263,23.108 -34.493,-1.445 -79.852,0.215 c -33.186,1.214 -63.06,20.464 -80.753,40.928 -4.912,-5.795 -16.286,-25.867 -19.004,-32.748 -1.679,-3.033 -0.326,-4.877 1.053,-5.487 35.615,-22.58 71.049,-28.938 95.573,-28.938 3.5,0 6.949,0.12 10.352,0.34 h 297.48 V 0 Z"
              />
            </g>
          </svg>
        </div>
        
        <div className="text-box">
          <div className="loading-text font-oswald">
            LOADING<span className="dots"></span>
          </div>
          <h2 className="title font-sebang">회장님의 위인전</h2>
          <div className="divider">
            <div className="line"></div>
            <p className="subtitle font-sebang">성균극회 제130회 정기대공연</p>
            <div className="line"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .loading-container {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #fafafa;
          z-index: 9999;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
        }
        
        .loading-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .logo-box {
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sdc-logo-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .sdc-logo-path-animated {
          fill: #111;
          fill-opacity: 0;
          stroke: #111;
          stroke-width: 8px;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 4000;
          stroke-dashoffset: 4000;
          animation: draw-fill-erase 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes draw-fill-erase {
          0% {
            stroke-dashoffset: 4000;
            fill-opacity: 0;
          }
          33.33% { /* 2.5s: Finish drawing */
            stroke-dashoffset: 0;
            fill-opacity: 0;
          }
          40% { /* 3.0s: Finish filling */
            stroke-dashoffset: 0;
            fill-opacity: 1;
          }
          60% { /* 4.5s: Hold filled state (checking) */
            stroke-dashoffset: 0;
            fill-opacity: 1;
          }
          66.66% { /* 5.0s: Unfill */
            stroke-dashoffset: 0;
            fill-opacity: 0;
          }
          100% { /* 7.5s: Erase */
            stroke-dashoffset: -4000;
            fill-opacity: 0;
          }
        }

        .text-box {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loading-text {
          color: #111;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dots {
          display: inline-block;
          width: 1.5em;
          text-align: left;
        }

        .dots::after {
          content: '';
          animation: loading-dots 1.5s infinite step-start;
        }

        @keyframes loading-dots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }

        .title {
          font-size: 2rem;
          font-weight: 900;
          color: #111;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .line {
          height: 1px;
          background-color: rgba(0, 0, 0, 0.15);
          flex-grow: 1;
          min-width: 40px;
        }

        .subtitle {
          font-size: 0.8rem;
          font-weight: 600;
          color: #666;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          .logo-box {
            width: 380px;
            height: 380px;
          }
        }
      `}} />
    </div>
  );
};
