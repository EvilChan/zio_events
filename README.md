# zio_events 轻量事件库

事件模型参考：[three.js/EventDispatcher.js at dev · mrdoob/three.js · GitHub](https://github.com/mrdoob/three.js/blob/dev/src/core/EventDispatcher.js)

区别在于：触发事件dispatchEvent，不以类实例作为事件回调入参，而是以解构数组参数作为事件回调入参，这样就可以支持多个场景

> 直接使用 EventDispatcher

```typescript
import { EventDispatcher } from "./mod.ts";

const event = new EventDispatcher();

const fn = (count: number) => {
  assertEquals(count, 1);
};

event.addEventListener("add", fn);

const fn2 = (count: number) => {
  assertEquals(count, 1);
};

event.addEventListener("add", fn2);

event.dispatchEvent("add", 1);
```

> 继承 EventDispatcher

```typescript
import { EventDispatcher } from "./mod.ts";

class Application extends EventDispatcher {
  run() {
    this.dispatchEvent("interval", 1, 2);
  }
}

const app = new Application();

app.addEventListener("interval", (count: number, doubleCount: number) => {
  console.log(count, doubleCount); // 1 2
});

app.run();
```

