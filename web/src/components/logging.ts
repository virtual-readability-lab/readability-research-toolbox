import {VERSION} from "../App";

export type ControlValue = boolean | number | string;

export interface LogRecord {
  datetime: Date,
  controlName: string,
  source: string,
  oldValue: ControlValue,
  newValue: ControlValue
}

const isEqualRecord = (r1: LogRecord, r2: LogRecord) => {
  return r1.controlName === r2.controlName &&
    r1.oldValue === r2.oldValue &&
    r1.newValue === r2.newValue
}

let nextRecordNumber = 0;
let lastRecord: LogRecord | null = null;

export const addLogRecord = (
  controlName: string,
  source: string,
  oldValue: ControlValue,
  newValue: ControlValue
) => {

  if (['html', 'setControlValue'].includes(controlName) ) {
    return  // we don't want to log the html or the setter function
  }
  const r: LogRecord = {
    datetime: new Date(),
    controlName: controlName,
    source: source,
    oldValue: oldValue,
    newValue: newValue,
  }
  if ((!lastRecord || !isEqualRecord(r, lastRecord)) && (oldValue !== newValue)){
    const recordValue = JSON.stringify(r);
    window.sessionStorage.setItem((nextRecordNumber++).toString(), recordValue);
    lastRecord = r;
  }
}

const getAllLogRecords = () => {
  const ret = Array.from({length: nextRecordNumber}, (_, i) => window.sessionStorage.getItem(i.toString()))
  return `[${ret.join(',\n')}]`
}
export const downloadAllLogRecords = () => {
  const data = new Blob([getAllLogRecords()], {type: 'application/json'});
  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = `log-${(new Date()).toISOString()}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  addLogRecord('na', 'downloadLog', 'na', link.download);
}

export const clearLogRecords = () => {
  window.sessionStorage.clear();
  nextRecordNumber = 0;
  addLogRecord('releaseVersion', 'init', 'na', VERSION)
  addLogRecord('logFormat', 'init', 'na', '2.0.0')
}