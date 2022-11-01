// A mock function to mimic making an async request for data
export function fetchCourse(data: any) {
  return new Promise<any>((resolve) =>
    fetch('/data', {method: 'POST',
      body: JSON.stringify(data)})
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return resolve(response.json())
      })
  );
}
