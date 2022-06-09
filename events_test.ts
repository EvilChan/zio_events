import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

import { EventDispatcher } from "./mod.ts";

Deno.test("添加事件", () => {
  const event = new EventDispatcher();

  const fn = () => {};

  event.addEventListener("add", fn);

  assertEquals(event.getListeners(), { "add": [fn] });
});

Deno.test("添加多同名事件", () => {
  const event = new EventDispatcher();

  const fn = () => {};

  event.addEventListener("add", fn);

  const fn2 = () => {};

  event.addEventListener("add", fn2);

  assertEquals(event.getListeners(), { "add": [fn, fn2] });
});

Deno.test("移除事件", () => {
  const event = new EventDispatcher();

  const fn = () => {};

  event.addEventListener("add", fn);

  const fn2 = () => {};

  event.addEventListener("add", fn2);

  event.removeEventListener("add", fn);

  assertEquals(event.getListeners(), { "add": [fn2] });

  const emptyEvent = new EventDispatcher();

  emptyEvent.removeEventListener("add", fn);

  assertEquals(emptyEvent.getListeners(), void 0);
});

Deno.test("判断当前是否存在事件监听器", () => {
  const event = new EventDispatcher();

  const fn = () => {};

  event.addEventListener("add", fn);

  const fn2 = () => {};

  event.addEventListener("add", fn2);

  const fn3 = () => {};

  assertEquals(event.hasEventListener("add", fn), true);

  assertEquals(event.hasEventListener("add", fn3), false);
});

Deno.test("触发事件", () => {
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
});
