
export default class SelectMemberCount {
  options = { visible : false, onSelect:()=>{}};

  constructor(element, options){
    this.element = element;
    this.setOptions(options);
    this.render();
    this._bindEvent();
  }

  render(){
    if(!this.element.innerHTML) { this.element.innerHTML = document.getElementById("selectMemberCount").innerHTML; }
    this.element.classList[this.options.visible ? "remove" : "add"]("hide");
  }

  _bindEvent(){
    this.element.querySelectorAll(".buttonsArea button").forEach((button)=> {
      button.addEventListener("click", e => {
        this.options.onSelect(e.currentTarget.value);
      });
    });
  }

  show(){ this.options.visible = true; this.render(); }

  hide(){ this.options.visible = false; this.render(); }

  setOptions(options){ this.options = Object.assign(this.options, options); this.render(); }
}
