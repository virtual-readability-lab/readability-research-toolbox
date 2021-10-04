/*
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any.  The
 * intellectual and technical concepts contained herein are
 * proprietary to Adobe and its suppliers and are protected
 * by all applicable intellectual property laws, including
 * trade secret and copyright laws.  Dissemination of this
 * information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained
 * from Adobe.
 *
 *
 */

import styles from "./FileChooser.module.css";
import {TextField} from "@adobe/react-spectrum";
import {ControlValue} from "./logging";
import useRest from "../useRest";

// if we are being called in the dev environment, it will be on port 3000, so change it to 5001
// but in production, we call on the same port as the front end, and nginx proxies the request on to port 5001
const API_BASE_URI =
  window.location.origin.replace('3000', '5001') + '/api/';

const FileChooser = (props: {
  updateControlValue: (name: string, source: string, value: ControlValue) => void
}) => {
  const {error, sendRequest} = useRest();

  const onFileChange = () => {
    const fileChooser = (document.getElementById('fileChooser') as HTMLInputElement);
    if (fileChooser && fileChooser.files) {
      const file = fileChooser.files[0];
      fetchHTML(file)
    }
  }

  const fetchHTML = (file: File) => {
    if (file) {
      const form = new FormData()
      form.append('file', file);
      sendRequest(
        {
          url: API_BASE_URI + 'convert',
          method: 'POST',
          headers: {},
          body: form,
        }, (data: string) => {
          props.updateControlValue('html', 'server', postProcessHTML(data))
        })
    }
  }

  const postProcessHTML = (rawHTML: string) => {
    // find the name of the file
    const reSubFolder = /<stem.*>([^<]*)<\/stem>/
    const m = rawHTML.match(reSubFolder)
    if (!m) {
      throw new Error('stem element not found')
    }
    const subFolder = m[1]
    const reSrc = /(src|href)="(js|css|images|fonts)/g
    return rawHTML.replace(reSrc, `$1="${API_BASE_URI}file/${subFolder}/$2`)
  }

  return (
    <div className={styles.FileChooser}>
      {error ? <h3>{error}</h3> : null}
      <TextField width="350px" type="file" onChange={onFileChange} id="fileChooser"
                 aria-label="Choose file" label="Input file" labelPosition="side"/>
    </div>
  );
}


export default FileChooser;
