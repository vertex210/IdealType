
export default class FinalResult {
  options = { visible : false};
  matches;
  constructor(element, options){
    this.element = element;
    this.options = Object.assign(this.options, options);
    this.render();
  }

  render(){
    if(!this.element.innerHTML) { this.element.innerHTML = document.getElementById("finalResult").innerHTML; }
    if(this.matches ) {
      const matchBoardElement = this.element.getElementsByClassName("matchBoard")[0];
      if(!matchBoardElement.innerHTML) {
        matchBoardElement.style.height = `${this.matches[0].length * 70}px`;

        this.matches.forEach(roundMatches => {
          matchBoardElement.innerHTML = matchBoardElement.innerHTML + document.getElementById("finalResultRoundMatches").innerHTML;

          const roundMatchesElement = matchBoardElement.querySelectorAll(".roundMatches:last-child")[0];
          roundMatches.forEach(match => {
            roundMatchesElement.innerHTML = roundMatchesElement.innerHTML + document.getElementById("finalResultMatch").innerHTML;

            const fighterElements = roundMatchesElement.querySelectorAll(".match:last-child .fighter");
            fighterElements[0].innerText = match.fighter1.name;
            fighterElements[1].innerText = match.fighter2.name;
            fighterElements[match.fighter1.seq === match.winner.seq ? 0 : 1].classList.add("winner");
          })
        });
      }
    }
    this.element.classList[this.options.visible ? "remove" : "add"]("hide");
  }

  show(){ this.options.visible = true; this.render(); }

  hide(){ this.options.visible = false; this.render(); }

  setMatches(matches){
    this.matches=matches;
    this.render();
  }
}
