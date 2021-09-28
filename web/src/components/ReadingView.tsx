import styles from "./ReadingView.module.css"
import {useControls} from "./Main";
import RulerOverlay, {rulerPosition} from "./RulerOverlay";
import {ProgressCircle} from "@adobe/react-spectrum";
import CSS from 'csstype'
import {colord} from "colord";
import {useEffect, useRef} from "react";

let dontScroll = false;

const ReadingView = () => {
  const controlValues = useControls();
  // we'd normally use state to hold the scrolling information, but we need to access these from a non-React event
  // handler (see the comment below for useEffect). So we use useRef to hold those values across renders. This acts
  // the same as state, but a) updates immediatley and b) doesn't cause re-rendering, which is exactly what we want.
  const lineMiddles = useRef([0])
  const scrollIndexRef = useRef(0)
  // we need DOM refs for several of our <div>s
  const contentPane = useRef<HTMLDivElement>(null)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const readingView = useRef<HTMLDivElement>(null)

  // a not great implementation of "contrast". We first convert to HSL. If we're in dark mode we adjust L; if in
  // light mode we adjust S. It kinda works.
  const backHSL = colord(controlValues.backgroundColor).toHsl();
  controlValues.darkMode ?
    backHSL.l = 100 - controlValues.backgroundSaturation
    :
    backHSL.s = controlValues.backgroundSaturation;
  const backgroundColor = colord(backHSL).toHex().toUpperCase()

  const showCursor = (controlValues.showRuler && controlValues.rulerDisableMouse) ? 'none' : 'default';

  // (re) compute the y coords of each line in the reading content. We need to do this whenever any control (well
  // almost any) changes
  useEffect(() => {
    const contentNode = contentPane.current;
    if (contentNode !== null && controlValues.showRuler) {
      // the magic that lets us get the DOMRect for each line of text is to create a Range, and then use
      // getClientRects(). These are in screen coords, To adjust to scroll positions, we first need to subtract the
      // offset of the content pane in screen coords.
      const contentNodeTop = contentNode!.getClientRects()[0].top;
      // Then we need to also adjust for the ruler, which is placed at 25% from the top
      const rulerDisplacement = scrollContainer.current!.clientHeight * rulerPosition / 100;
      const lineOrigin = contentNodeTop + rulerDisplacement;

      const range = document.createRange(); // we want all nodes that are descended from the content pane
      range.setStartBefore(contentNode);
      range.setEndAfter(contentNode);
      // the first client rect is some container - not sure which one or how to eliminate it, so we'll just skip it
      const lineRects = [...range.getClientRects()].slice(1);
      if (controlValues.rulerUnderline)
        lineMiddles.current = lineRects.map((r) => r.bottom - lineOrigin)
      else
        lineMiddles.current = lineRects.map((r) => ((r.top + r.bottom) / 2) - lineOrigin)
      // since the middles may have changed, reset our current scroll position
      setScroll(scrollIndexRef.current);
    }
  }, [controlValues]);

  // when the scroll index has changed, clip it to the bounds of the line positions, update the scrollTop to the
  // appropriate position, and save the index it in its ref
  const setScroll = (newScrollIndex: number) => {
    let mids = lineMiddles.current;
    if (newScrollIndex < 0) {
      newScrollIndex = 0;
    }
    if (newScrollIndex >= mids.length) {
      newScrollIndex = mids.length - 1;
    }
    (scrollContainer.current!).scrollTop = mids[newScrollIndex];
    scrollIndexRef.current = newScrollIndex
  }

  // when we're using the ruler, we don't want the wheel event to perform its native function, so we can control the
  // positioning. but in order to set preventDefault(), we also need to make the handler be not passive. But React
  // events set passive true by default, and don't provide any way to change this. Thus we need to use the native
  // addEventListener to accomplish this
  useEffect(() => {
    // only invoked when the ruler is shown. For each click of the wheel, we increment or decrement the current scroll
    // index
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      dontScroll = true;
      setScroll(scrollIndexRef.current + (e.deltaY > 0 ? 1 : -1));
      console.log('wheel')
    }
    if (controlValues.showRuler) {
      const readingViewElement = readingView.current;
      readingViewElement!.addEventListener('wheel', onWheel, {passive: false})
      return () => {
        readingViewElement!.removeEventListener('wheel', onWheel)
      }
    }
  }, [controlValues.showRuler])

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!controlValues.showRuler) return;
    if (dontScroll) {
      dontScroll = false;
      return;
    }
    let nearestLineIndex = lineMiddles.current.findIndex(m => m >= e.currentTarget.scrollTop);
    if (nearestLineIndex === -1) nearestLineIndex = lineMiddles.current.length;
    setScroll(nearestLineIndex);
  }
  return (
    <div className={styles.ReadingView} ref={readingView}>
      {controlValues.html ?
        (controlValues.html === 'loading' ?
          <div className={styles.LoadingContainer}>
            <div><ProgressCircle aria-label="Loading…" isIndeterminate/></div>
            <div>Converting PDF...</div>
          </div>
          :
          <>
            <RulerOverlay/>
            <div className={styles.ScrollContainer} style={{width: `${controlValues.columnWidth + 1.2}in`}}
                 ref={scrollContainer} onScroll={onScroll}>
              <div className={styles.ContentPane} dangerouslySetInnerHTML={{__html: controlValues.html}}
                   ref={contentPane}
                   style={{
                     fontSize: controlValues.fontSize,
                     fontFamily: controlValues.fontName,
                     lineHeight: controlValues.lineHeight,
                     letterSpacing: `${controlValues.characterSpacing}em`,
                     textAlign: controlValues.textAlignment as CSS.Property.TextAlign,
                     wordSpacing: `${controlValues.wordSpacing}em`,
                     ['--text_indent' as any]: `${controlValues.paragraphIndent}in`,
                     ['--paragraph_spacing' as any]: `${controlValues.paragraphSpacing}em`,
                     width: `${controlValues.columnWidth}in`,
                     backgroundColor: backgroundColor,
                     color: controlValues.foregroundColor,
                     cursor: showCursor,
                     padding: controlValues.showRuler ? `${rulerPosition + 5}% 0.5in 100% 0.5in` : '0.5in',
                   }}/>
            </div>

          </>)
        :
        <h2 className={styles.PleaseChoose}>&lt;= Please choose input file</h2>
      }
    </div>
  )
}

export default ReadingView;

