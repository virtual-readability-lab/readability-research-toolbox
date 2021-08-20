import styles from "./ReadingView.module.css"
import {useControls} from "./Main";
import RulerOverlay from "./RulerOverlay";
import {ProgressCircle} from "@adobe/react-spectrum";
import CSS from 'csstype'
import {useEffect, useRef} from "react";

/*
Originally I just read the HTML content from the server and rendered it in an unsafe innerHTML, adjusting the
references to css, images, etc. to have the correct host and path. But the very arrogant CSS in Liquid Mode
messed up the rest of the page, e.g. with !important values on selectors like p. So, for example, drop down lists
in the controls didn't line up correctly. Sigh.

So I then tried referencing the content in an iframe. That constrained the influence of the LM CSS to just the document
inside the iframe, which was good. However, it meant that we couldn't access the elements inside the iframe from
outside, in order to have the controls do something. It's a cors violation. Sigh again. The only good news is that
we didn't have to patch the HTML for the references, since they were all relative to the HTML url.

Next attempt is to use the shadow DOM technique. This seems to work well. We can still access the styling of the
attached HTML, but the loaded CSS does not affect the "outside" parts of the web app.
 */

const ReadingView = () => {
  const controlValues = useControls();
  const contentPane = useRef(null);
  useEffect(() => {
    const attachShadow = (parent: any) => {
      if (!parent) {
        return;
      }
      parent.attachShadow({mode: 'open'});
      parent.shadowRoot!.innerHTML = controlValues.html;
      parent.innerHTML = ''
    }
    attachShadow(contentPane.current)
    const x = contentPane.current
    console.log(x)
  }, [controlValues.html])

  return (
    <div className={styles.ReadingView}>
      {controlValues.html ?
        (controlValues.html === 'loading' ?
          <div className={styles.LoadingContainer}>
            <div><ProgressCircle aria-label="Loading…" isIndeterminate/></div>
            <div>Converting PDF...</div>
          </div>
          :
          <>
            <RulerOverlay/>
            <div className={styles.ScrollContainer}>
              <div className={styles.ContentPane} ref={contentPane}
                   style={{
                     fontSize: controlValues.fontSize,
                     fontFamily: controlValues.fontName,
                     lineHeight: controlValues.lineHeight,
                     letterSpacing: `${controlValues.characterSpacing}em`,
                     textAlign: controlValues.textAlignment as CSS.Property.TextAlign,
                     wordSpacing: `${controlValues.wordSpacing}em`, // Not working - because of !important in LM CSS
                     textIndent: `${controlValues.paragraphIndent}em`,
                     width: `${controlValues.columnWidth}in`,
                     backgroundColor: controlValues.backgroundColor,
                     color: controlValues.foregroundColor,
                     padding: controlValues.showRuler ? '400px 0.5in' : '0.5in' // the 400px is a hack-must be a better way
                   }}/>
            </div>
          </>)
        :
        <h2 className={styles.PleaseChoose}>&lt;= Please choose input PDF file</h2>
      }
    </div>
  )
}

export default ReadingView;

