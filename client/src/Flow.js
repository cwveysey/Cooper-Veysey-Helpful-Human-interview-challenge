
export default class Flow {
  static list_view = new Flow("list_view")
  static detail_view = new Flow("detail_view")

    constructor(view_type) {
        this.view_type = view_type  
  }
}