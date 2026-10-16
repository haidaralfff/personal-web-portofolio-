import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const loadFont = (fontFamily, fontUrl) => {
  return new Promise((resolve) => {
    const existing = document.fonts.check(`12px "${fontFamily}"`);
    if (existing) return resolve(true);

    const fontFace = new FontFace(fontFamily, `url(${fontUrl})`, {
      weight: '100 900',
      style: 'normal',
      display: 'swap'
    });

    fontFace.load().then((loaded) => {
      document.fonts.add(loaded);
      resolve(true);
    }).catch(() => {
      resolve(false);
    });
  });
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',

  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [fontLoaded, setFontLoaded] = useState(false);

  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    loadFont(fontFamily, fontUrl).then((loaded) => {
      setFontLoaded(loaded);
    });
  }, [fontFamily, fontUrl]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        const xRatio = containerW / textRect.width;
        const ratio = Math.min(yRatio, xRatio, 1);
        setScaleY(ratio);
        setLineHeight(ratio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  // Cache bounding rects to avoid getBoundingClientRect per frame
  const spanRectsRef = useRef([]);
  const titleWidthRef = useRef(0);

  const cacheRects = useCallback(() => {
    if (titleRef.current) {
      titleWidthRef.current = titleRef.current.getBoundingClientRect().width / 2;
    }
    spanRectsRef.current = spansRef.current.map((span) => {
      if (!span) return null;
      const rect = span.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    let rafId;
    let frameCount = 0;

    // Cache rects on mount and resize
    cacheRects();
    window.addEventListener('resize', cacheRects);

    const animate = () => {
      // Run at ~30fps (skip every other frame)
      frameCount++;
      if (frameCount % 2 !== 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      const maxDist = titleWidthRef.current;

      spansRef.current.forEach((span, i) => {
        if (!span || !spanRectsRef.current[i]) return;

        const charCenter = spanRectsRef.current[i];
        const d = dist(mouseRef.current, charCenter);

        const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
        const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
        const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
        const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

        const newSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

        if (span.style.fontVariationSettings !== newSettings) {
          span.style.fontVariationSettings = newSettings;
        }
        if (alpha && span.style.opacity !== alphaVal) {
          span.style.opacity = alphaVal;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', cacheRects);
    };
  }, [fontLoaded, width, weight, italic, alpha, cacheRects]);

  const styleElement = useMemo(() => {
    return (
      <style>{`
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
    );
  }, [textColor, strokeColor, strokeWidth]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible bg-transparent">
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? 'flex justify-between' : ''
        } ${stroke ? 'stroke' : ''} uppercase text-center`}
        style={{
          fontFamily: fontLoaded ? fontFamily : 'inherit',
          fontSize,
          lineHeight,
          transform: `scale(${scaleY}, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { spansRef.current[i] = el; }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
