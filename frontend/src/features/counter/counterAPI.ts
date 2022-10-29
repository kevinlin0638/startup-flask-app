// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<any>((resolve) =>
    fetch('http://127.0.0.1:5000/data')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return resolve(response.json())
      })
  );
}
