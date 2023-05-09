import { Tool } from 'langchain/tools';

class TestTool extends Tool {
  name: string;

  description: string;

  constructor() {
    super();
    this.name = 'testtool';
    this.description = 'a test tool that is used when you want to test the agent functionality.';
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    return 'You used the test tool!';
  }
}

export { TestTool };
