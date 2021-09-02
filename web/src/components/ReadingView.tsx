import styles from "./ReadingView.module.css"
import {useControls} from "./Main";
import RulerOverlay from "./RulerOverlay";
import {ProgressCircle} from "@adobe/react-spectrum";
import CSS from 'csstype'
import {colord} from "colord";

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
  const backHSL = colord(controlValues.backgroundColor).toHsl();
  controlValues.darkMode ?
    backHSL.l = 100 - controlValues.backgroundSaturation
    :
    backHSL.s = controlValues.backgroundSaturation;
  const backgroundColor = colord(backHSL).toHex().toUpperCase()
  const showCursor = (controlValues.showRuler && controlValues.rulerDisableMouse) ? 'none' : 'default';
  console.log(showCursor)
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
            <div className={styles.ScrollContainer} style={{width: `${controlValues.columnWidth + 1.2}in`}}>
              <div className={styles.ContentPane} dangerouslySetInnerHTML={{__html: controlValues.html}}
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
                     // the 200px is a hack-must be a better way
                     padding: controlValues.showRuler ? '200px 0.5in' : '0.5in',
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

