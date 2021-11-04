
/*
 * Copyright 2021 Michael Kraley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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