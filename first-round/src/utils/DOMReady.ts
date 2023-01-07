const DOMReady = new Promise<void>((resolve) => {
  const { readyState } = window.document;

  if (readyState !== 'loading') {
    resolve();
    return;
  }

  const READY_EVENT = 'DOMContentLoaded';
  const handler = () => {
    window.removeEventListener(READY_EVENT, handler);
    resolve();
  };

  window.addEventListener(READY_EVENT, handler);
});

export default DOMReady;
