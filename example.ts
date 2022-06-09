import { EventDispatcher } from "https://deno.land/x/zio_events@v1.0.0/mod.ts";

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
