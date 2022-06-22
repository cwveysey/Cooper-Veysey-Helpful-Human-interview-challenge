// Configured in accordance with https://2ality.com/2020/01/enum-pattern.html, "A class-based enum pattern for JavaScript"
export default class TestId {
    
    static ColorDetailViewTestId = new TestId('ColorDetailViewTestId')
    static ColorGridTestId = new TestId('ColorGridTestId')
    static ColorGridSwatchTestId = new TestId('ColorGridSwatchTestId')
    static HomeTestId = new TestId('HomeTestId') 
    static NavigationBarTestId = new TestId('NavigationBarTestId')
    static PaginationListTestId = new TestId('PaginationListTestId')
    static SidebarTestId = new TestId('SidebarTestId')
    static Helpful_Human_logo_button_TestId = new TestId('Helpful_Human_logo_button_TestId')
    static Helpful_Human_logo_img_TestId = new TestId('Helpful_Human_logo_img_TestId')
    
    constructor(testIDValue) {
        this.testIDValue = testIDValue
    }
    toString() {
        return `TestId.${this.testIDValue}`;
    }
}