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

import { useState, useCallback } from 'react';

export type RequestInfo = {
  url: string,
  method: string,
  headers: {[name: string]: string},
  body: string | FormData | null,
}

/*
  Reusable hook for making REST requests.
  Returns three values:
   - isLoading - boolean that indicates that a request has been sent, but has not yet been received
   - error - if non-null, a string describing the error that has occurred
   - sendRequest - a void function that takes two arguments: the first is of type RequestInfo, the second is a
    void function that receives the data upon success. If the response is application/json, the data will be in a JSON
     object, else as a string.
 */
const useRest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendRequest = useCallback(async (
    requestInfo: RequestInfo, processResults) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestInfo.url, {
        method: requestInfo.method ? requestInfo.method : 'GET',
        headers: requestInfo.headers ? requestInfo.headers : {},
        body: requestInfo.body,
      });

      if (!response.ok) {
        const errorMessage = `${response.status}: ${response.statusText}`
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("Content-Type");

      const data = contentType === 'application/json' ? await response.json() : await response.text();
      processResults(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    }
    setIsLoading(false);
    return null;
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};


export default useRest;