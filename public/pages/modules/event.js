function createCustomEvent(path) {
    const customEvent = new CustomEvent("onstatechange", {
      detail: {
        path: path,
      },
    });
    return customEvent;
  }
  
  export default createCustomEvent;
  