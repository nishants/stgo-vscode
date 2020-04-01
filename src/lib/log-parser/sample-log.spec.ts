import parser from './index';
import * as sampleData from './sample-log.json';

describe('lib', () => {
  test('if utils mocked automatically', () => {
    expect(parser.parse(sampleData)).toMatchSnapshot();
  });
});