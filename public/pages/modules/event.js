function createCustomEvent(path) {
    const event = new CustomEvent("onstatechange", {
      detail: {
        path: path,
      },
    });
    return event;
  }
  
  export default createCustomEvent;
  