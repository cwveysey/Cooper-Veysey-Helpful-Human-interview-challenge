// Configured in accordance with https://2ality.com/2020/01/enum-pattern.html, "A class-based enum pattern for JavaScript"

export default class ViewConfiguration {
  static list_view = new ViewConfiguration("list_view")
  static detail_view = new ViewConfiguration("detail_view")
  static tints_grid_view = new ViewConfiguration("tints_grid_view")
  static shades_grid_view = new ViewConfiguration("shades_grid_view")

    constructor(type) {
      this.type = type  
  }
  toString() {
    return `ViewConfiguration.${this.type}`;
  }
}