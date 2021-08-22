export interface LogRecord {
  datetime: Date,
  controlName: string,
  oldValue: boolean | number | string,
  newValue: boolean | number | string
}

const isEqualRecord = (r1: LogRecord, r2: LogRecord) => {
  return r1.controlName === r2.controlName &&
    r1.oldValue === r2.oldValue &&
    r1.newValue === r2.newValue
}

let nextRecordNumber = 0;
let lastRecord: LogRecord | null = null;

export const addLogRecord = (r: LogRecord) => {
  if (r.controlName === 'html') {
    return  // we don't want to log the html
  }
  if (!lastRecord || !isEqualRecord(r, lastRecord)) {
    const recordValue = JSON.stringify(r);
    window.sessionStorage.setItem((nextRecordNumber++).toString(), recordValue);
    lastRecord = r;
  }
}

const getAllLogRecords = () => {
  const ret = Array.from({length: nextRecordNumber}, (_, i) => window.sessionStorage.getItem(i.toString()))
  return `[${ret.join(',')}]`
}
export const downloadAllLogRecords = () => {
  const data = new Blob([getAllLogRecords()], {type: 'application/json'});
  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = `log-${(new Date()).toISOString()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const clearLogRecords = () => {
  window.sessionStorage.clear();
  nextRecordNumber = 0;
}