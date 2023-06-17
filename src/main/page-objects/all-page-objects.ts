import { ICustomWorld } from "../hooks/custom-world";
import {BasePage} from "./base-page";

export class AllPagesObject {
  basePage: BasePage;
  
  constructor(iCustomWorld: ICustomWorld) {
    this.basePage = new BasePage(iCustomWorld);
  }
}
