// deno-lint-ignore-file ban-types

export class EventDispatcher {
  #listeners?: Record<string, Array<Function>>;

  /**
   * 获取监听器实例，对上面进行增删改操作，会影响到当前实例的运作，慎用！！！
   * @returns 返回监听器实例
   */
  getListeners() {
    return this.#listeners;
  }

  /**
   * 添加事件监听
   * @param type 事件名称
   * @param listener 回调函数
   */
  addEventListener(type: string, listener: Function) {
    // 初始化监听器
    if (this.#listeners === undefined) this.#listeners = {};

    const listeners = this.#listeners;

    // 如果没有事件类型，则创建对应事件的监听器数组
    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    // 如果对应事件的监听器数组没有监听者，则push进监听器数组
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }

  /**
   * 判断当前事件中是否存在回调函数（入参）
   * @param type 事件名称
   * @param listener 回调函数
   * @returns
   */
  hasEventListener(type: string, listener: Function) {
    // 如果当前监听器为空，则返回false
    if (this.#listeners === undefined) return false;

    const listeners = this.#listeners;

    // 如果对应事件的监听器数组未包含传入的监听器，返回false
    return listeners[type] !== undefined &&
      listeners[type].indexOf(listener) !== -1;
  }

  /**
   * 移除事件监听
   * @param type 事件名称
   * @param listener 回调函数
   * @returns
   */
  removeEventListener(type: string, listener: Function) {
    // 如果当前监听器为空，则不需要执行移除操作
    if (this.#listeners === undefined) return;

    const listeners = this.#listeners;
    const listenerArray = listeners[type];

    // 如果对应事件的监听器数组包含传入的监听器，则在对应索引进行移除
    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }

  /**
   * 调用事件监听
   * @param type 事件名称
   * @param args 给事件回调的参数
   * @returns
   */
  dispatchEvent(type: string, ...args: unknown[]) {
    // 如果当前监听器为空，则不需要执行操作
    if (this.#listeners === undefined) return;

    const listeners = this.#listeners;
    const listenerArray = listeners[type];

    // 如果对应事件的监听器数组存在，则按顺序依次将args参数传入至监听器中
    if (listenerArray !== undefined) {
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, ...args);
      }
    }
  }
}
