import { Action } from "actionhero";

export class BrokenAction extends Action {
  constructor() {
    super();
    this.name = "broken";
    this.description = "I crash :(";
    this.outputExample = {};
  }

  async run(data) {
    throw new Error("OH NO");
  }
}
