// Configured in accordance with https://2ality.com/2020/01/enum-pattern.html, "A class-based enum pattern for JavaScript"

export default class Flow {
  static list_view = new Flow("list_view")
  static detail_view = new Flow("detail_view")
  static tints_grid_view = new Flow("tints_grid_view")
  static shades_grid_view = new Flow("shades_grid_view")

    constructor(view_type) {
        this.view_type = view_type  
  }
  toString() {
    return `Flow.${this.view_type}`;
  }
}