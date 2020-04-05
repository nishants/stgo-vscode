import {
    Workbench,
    Notification,
    WebDriver,
    VSBrowser,
    NotificationType,
    InputBox,
} from 'vscode-extension-tester';
import { expect } from 'chai';
import * as path from 'path';

const TIMEOUT = 100000;
describe('e2e:extensoin-test', () => {
    let driver: WebDriver;

    before(() => {
        driver = VSBrowser.instance.driver;
    });

    const openMockWorkspace = async () => {
        const workspacePath = path.join(
            process.cwd(),
            'test-resources',
            'mock-saxotrader-workspace'
        );
        await new Workbench().executeCommand('Extest: Open Folder');
        const input = await InputBox.create();
        await input.setText(workspacePath);
        await input.confirm();
    };

    it('Should load extension in mocked workspace', async function () {
        this.timeout(TIMEOUT);
        const workbench = new Workbench();
        await openMockWorkspace();

        const expectedMockWarningMessage = 'Running stgoci against mocks.';

        await workbench.executeCommand('stgoci');

        const notification = (await driver.wait(() => {
            return notificationExists(expectedMockWarningMessage);
        }, TIMEOUT)) as Notification;

        expect(await notification.getMessage()).equals(
            expectedMockWarningMessage
        );
        expect(await notification.getType()).equals(NotificationType.Warning);

        const openTabs = await workbench.getEditorView().getOpenEditorTitles();
        expect(openTabs).to.eql(['Welcome', 'React App']);
    });
});

// Get notification with text
async function notificationExists(
    text: string
): Promise<Notification | undefined> {
    const notifications = await new Workbench().getNotifications();
    for (const notification of notifications) {
        const message = await notification.getMessage();
        if (message.indexOf(text) >= 0) {
            return notification;
        }
    }
}
