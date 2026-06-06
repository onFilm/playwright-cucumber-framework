import expect from "expect";
import {join} from "path";
import { ICustomWorld } from "../hooks/custom-world";

export class BasePage {
  iCustomWorld: ICustomWorld;

  constructor(iCustomWorld: ICustomWorld) {
    this.iCustomWorld = iCustomWorld;
  }

  public get expect() {
    return expect;
  }

  public screenshot(name: string): Promise<Buffer> | undefined {
    return this.iCustomWorld.page?.screenshot({path: join("screenshots", `${name}.png`)});
  }
}
