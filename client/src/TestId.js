/* Configured in accordance with 

1) https://2ality.com/2020/01/enum-pattern.html, "A class-based enum pattern for JavaScript."

2) A Cypress "best practice" outlined via https://docs.cypress.io/guides/references/best-practices#Selecting-Elements,
 "use data-* attributes to provide context to your selectors and isolate them from CSS or JS changes" */ 

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
    static Random_color_button_TestId = new TestId('Random_color_button_TestId')
    static Color_square_detail_view_TestId = new TestId('Color_square_detail_view_TestId')
    static Color_square_list_view_TestId = new TestId('Color_square_list_view_TestId')
    static Tints_and_shades_grid_view_Color_square_TestId = new TestId('Tints_and_shades_grid_view_Color_square_TestId')
    static List_view_ColorGrid_TestId = new TestId('List_view_ColorGrid_TestId')
    static Tints_and_shades_grid_view_ColorGridSwatch_container_TestId = new TestId('Tints_and_shades_grid_view_ColorGridSwatch_container_TestId')
    static List_view_ColorGridSwatch_container_TestId = new TestId('List_view_ColorGridSwatch_container_TestId')
    static Detail_view_ColorGridSwatch_container_TestId = new TestId('Detail_view_ColorGridSwatch_container_TestId')
    static Color_group_list_item_TestId = new TestId('Color_group_list_item_TestId')
    
    constructor(testIDValue) {
        this.testIDValue = testIDValue
    }
    toString() {
        return `TestId.${this.testIDValue}`;
    }
}