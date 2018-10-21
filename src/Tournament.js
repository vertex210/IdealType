import {getMembers} from "src/Members";

export default class Tournament {
  options = { visible : false, onFinish : ()=>{}};
  members;
  matches;
  round;
  matchStep;

  constructor(element, options){
    this.element = element;
    this.options = Object.assign(this.options, options);
    this.render();
    this._bindEvent();
  }

  render(){
    if(!this.element.innerHTML) {this.element.innerHTML = document.getElementById("tournament").innerHTML; }
    this.element.classList[this.options.visible ? "remove" : "add"]("hide");

    this._renderBackButtonVIsible();

    if(this.round>0){
      this._renderCurrentMemberCount();
      this._renderFighters();
    }
  }

  _renderFighters(){
    const currentMatch = this.getCurrentMatch();
    this.element.querySelectorAll(".fighter").forEach((fighterElement, index) => {
      const figherInfo = currentMatch[`fighter${index+1}`];
      import(`images/${figherInfo.image}`).then(fighterImage => {
        fighterElement.getElementsByClassName("fighterImg")[0].src=fighterImage.default;
      });
      fighterElement.getElementsByClassName("fighterName")[0].innerText=figherInfo.name;
    })
  }

  _renderCurrentMemberCount(){
    this.element.getElementsByClassName("round")[0].innerText = this.members.length/Math.pow(2, this.round-1);
  }

  _renderBackButtonVIsible(){
    this.element.getElementsByClassName("btnBack")[0].classList[this.matches && this.matches[0][0].winner ? "remove" : "add"]("hide");
  }
  _bindEvent(){
    this.element.querySelectorAll(".fighter").forEach((button)=> {
      button.addEventListener("click", e => {
        this._setWinner(e.currentTarget.value);
        this._goNextMatches();
      });
    });

    this.element.getElementsByClassName("btnBack")[0].addEventListener("click", () => {
      this._goPrevMatches();
    })
  }

  _setWinner(fighterIndex){
    const currentMatch = this.getCurrentMatch();
    currentMatch.winner= currentMatch[`fighter${parseInt(fighterIndex)+1}`];
  }

  getCurrentRound(){
    return this.matches[this.round-1];
  }

  getCurrentMatch(){
    return this.getCurrentRound()[this.matchStep-1];
  }

  show(){ this.options.visible = true; this.render(); }

  hide(){ this.options.visible = false; this.render(); }

  setOptions(options){ this.options = Object.assign(this.options, options); this.render(); }

  start(memberCount){
    this.members = getMembers(memberCount);
    this._initMatches();
  }

  _initMatches(){
    this.matches = [];
    this.round = 0;
    this._goNextRound();
  }

  _goNextRound(){
    this.round+=1;
    this.matchStep = 0;
    this.matches[this.round-1] = this._createMatches();
    this._goNextMatches();
  }

  _goPrevRound(){
    this.round-=1;
    this.matchStep = this.getCurrentRound().length-1;
    this._goNextMatches();
  }

  _createMatches(){
    const newMatches = [];
    const matchCount = this.members.length/Math.pow(2, this.round);
    for(let i=0;i<matchCount;i++){
      newMatches.push({
        fighter1 : this.round===1 ? this.members[i*2] : this.matches[this.round-2][i*2].winner,
        fighter2 : this.round===1 ? this.members[i*2+1] : this.matches[this.round-2][i*2+1].winner,
        winner : undefined
      });
    }
    return newMatches;
  }

  _goNextMatches(){
    if(this._isFinalMatches()) { this.options.onFinish && this.options.onFinish(this.matches); }
    else if(this.matchStep >= this.getCurrentRound().length){ this._goNextRound(); }
    else {
      this.matchStep+=1;
      this._renderBackButtonVIsible();
      this._renderCurrentMemberCount();
      this._renderFighters();
    }
  }

  _goPrevMatches(){
    if(this.matchStep <=1){ this._goPrevRound(); }
    else {
      this.matchStep-=1;
      this.getCurrentMatch().winner = undefined;
      this._renderBackButtonVIsible();
      this._renderCurrentMemberCount();
      this._renderFighters();
    }
  }

  _isFinalMatches(){
    const currentRound = this.getCurrentRound();
    return currentRound.length===1 && this.matchStep >= currentRound.length;
  }
}



