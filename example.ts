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
