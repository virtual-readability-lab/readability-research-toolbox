
export const randomizeArray = <T>(items: T[]) => {
  return items.map((c) => ({val: c, sort: Math.random()}))
    .sort((x, y) => x.sort - y.sort)
    .map(({val}) => val)
}

export function downloadFile(data: Blob, filename: string) {
  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}