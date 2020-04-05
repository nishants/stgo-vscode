import {
    Workbench,
    Notification,
    WebDriver,
    VSBrowser,
    NotificationType,
    InputBox
} from 'vscode-extension-tester';
import { expect } from 'chai';

describe('Hello World Example UI Tests', () => {
    let driver: WebDriver;

    before(() => {
        driver = VSBrowser.instance.driver;
    });

    it('Command shows a notification with the correct text', async function() {
        this.timeout(100000);

        const workbench = new Workbench();

        await new Workbench().executeCommand('Extest: Open Folder');
        const input = await InputBox.create();
        // const input = new InputBox();

        await input.setText('/Users/dawn/Desktop/vs-code-test');
        await input.confirm();

        const expectedMockWarningMessage = 'Running stgoci against mocks.';

        await workbench.executeCommand('stgoci');

        const notification = await driver.wait(() => {
            return notificationExists(expectedMockWarningMessage); }, 12000) as Notification;

        expect(await notification.getMessage()).equals(expectedMockWarningMessage);
        expect(await notification.getType()).equals(NotificationType.Warning);

        const openTabs = await workbench.getEditorView().getOpenEditorTitles();
        expect(openTabs).to.eql([ 'Welcome', 'React App' ]);

    });
});

// Get notification with text
async function notificationExists(text: string): Promise<Notification | undefined> {
    const notifications = await new Workbench().getNotifications();
    for (const notification of notifications) {
        const message = await notification.getMessage();
        if (message.indexOf(text) >= 0) {
            return notification;
        }
    }
}