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

import React, {useState} from "react";
import styles from "./FileChooser.module.css";
import {TextField} from "@adobe/react-spectrum";

// if we are being called in the dev environment, it will be on port 3000, so change it to 5000
// but in production, we call on the same port as the front end, and nginx proxies the request on to port 5000
const API_BASE_URI =
  window.location.origin.replace('3000', '5000') + '/api/';

const FileChooser = (props: {
  updateControlValue: (name: string, value: boolean | number | string) => void
}) => {
  const [errorMsg, setErrorMsg] = useState('')

  const postProcessHTML = (rawHTML: string) => {
    return rawHTML;
  }

  const fetchHTML = async (file: File) => {
    if (file) {
      const form = new FormData()
      form.append('file', file);
      let error_received = false;
      setErrorMsg('');
      fetch(API_BASE_URI + 'convert', {
        mode: 'cors',
        method: 'POST',
        body: form
      })
        .then(response => {
          if (!response.ok || response.headers.get('Content-Type') === 'text/plain') {
            error_received = true;
            return response.text();
          }
          return response.text()
        })
        .then(data => {
          if (error_received) {
            throw Error(data)
          }
          props.updateControlValue('html', postProcessHTML(data));
        })
        .catch(error => {
          setErrorMsg('Error fetching content: ' + error.message)
        })
    }
  }

  const onFileChange = () => {
    const fileChooser = (document.getElementById('fileChooser') as HTMLInputElement);
    if (fileChooser && fileChooser.files) {
      const file = fileChooser.files[0];
      fetchHTML(file)
    }
  }

  return (
    <div className={styles.FileChooser}>
      {errorMsg ? <h3>{errorMsg}</h3>: null}
      <TextField width="350px" type="file" onChange={onFileChange} id="fileChooser"
                 aria-label="Choose file" label="Input file" labelPosition="side"/>
    </div>
  );
}


export default FileChooser;
