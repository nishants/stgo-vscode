import filePointReader from './filePointReader';

const path = require('path');

const toPath = (...pathArray: string[]) => pathArray.join(path.sep);

describe('filePointReader', () => {
    test('it should find correct file from log', () => {
        const screenshot = {
            path: "\\drop\\cypress\\screenshots\\app\\integration\\integration.spec.js",
            fileName: "srcfrontendappintegrationintegration -- phone deeplink for chat -- should render correctly (1).png",
        };
        const actual = filePointReader(screenshot).filePath;
        const expected = toPath('app', 'integration', 'integration.spec.js');
        expect(actual).toBe(expected);
    });
});