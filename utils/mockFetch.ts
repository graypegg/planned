export const danny = {
  "age": 14,
  "country": "Brunei Darussalam",
  "email": "dan_walter@gmail.com",
  "name": {
    "firstName": "Danny",
    "lastName": "Walter"
  }
};
export const youngAric = {
  "age": 12,
  "country": "United Kingdom",
  "email": "aric_reynolds@yahoo.com",
  "name": {
    "firstName": "Aric",
    "lastName": "Reynolds"
  }
};
export const graham = {
  age: 25,
  country: "Canada",
  email: "me@graypegg.com",
  name: {
    firstName: "Graham",
    lastName: "Pegg"
  }
};
export const belle = {
  "age": 97,
  "country": "Comoros",
  "email": "belle_blanda@gmail.com",
  "name": {
    "firstName": "Belle",
    "lastName": "Blanda"
  }
};
export const oldAric = {
  "age": 70,
  "country": "Peru",
  "email": "aric_reynolds_the_old@hotmail.com",
  "name": {
    "firstName": "Aric",
    "lastName": "Reynolds"
  }
};

export const allKidsResponse = {
  json () {
    return Promise.resolve({
      data: [
        danny,
        youngAric
      ]
    })
  }
}
export const allAdultsResponse = {
  json () {
    return Promise.resolve({
      data: [
        graham
      ]
    })
  }
}
export const allSeniorsResponse = {
  json () {
    return Promise.resolve([
        belle,
        oldAric
    ])
  }
}

declare global {
  var oldFetch: undefined | typeof fetch;
}

export function mockFetch() {
  const mockedFetch = vi.fn()
  global.oldFetch = global.fetch
  global.fetch = mockedFetch
  return mockedFetch
}
export function unmockFetch() {
  if (global.oldFetch) {
    global.fetch = global.oldFetch
  }
}
