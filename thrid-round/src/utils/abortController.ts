export type Instances = Map<string, AbortController>;

export class Controller {
  private instances: Instances;
  
  constructor() {
    this.instances = new Map<string, AbortController>();
  }

  public instance(deps?: unknown) {
    const hash = JSON.stringify(deps);

    const prevInstance = this.instances.get(hash);
    if (prevInstance) {
      prevInstance.abort();
    }

    const newInstance = new AbortController();
    this.instances.set(hash, newInstance);

    return newInstance.signal;
  }
}
