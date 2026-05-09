export class Net {
  constructor(initialSignals = {}) {
    this.signals = new Map(Object.entries(initialSignals));
    this.listeners = new Map();
  }

  define(name, initialValue = 0) {
    if (!this.signals.has(name)) {
      this.signals.set(name, initialValue);
    }
  }

  get(name) {
    return this.signals.get(name);
  }

  set(name, value) {
    const previous = this.signals.get(name);

    if (previous === value) {
      return;
    }

    this.signals.set(name, value);
    this.emit(name, value, previous);
  }

  subscribe(name, callback) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, []);
    }

    this.listeners.get(name).push(callback);

    return () => {
      const listeners = this.listeners.get(name) ?? [];
      this.listeners.set(
        name,
        listeners.filter((listener) => listener !== callback),
      );
    };
  }

  emit(name, value, previous) {
    const listeners = this.listeners.get(name) ?? [];

    for (const listener of listeners) {
      listener(value, previous, name);
    }
  }

  snapshot() {
    return Object.fromEntries(this.signals);
  }
}
