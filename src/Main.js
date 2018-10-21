import 'css/style.css';
import SelectMemberCount from "src/SelectMemberCount";
import Tournament from "src/Tournament";
import FinalResult from "src/FinalResult";


export default class Main {
  constructor(element){
    this.element = element;
    this.render();
    this.bindEvent();
  }

  render(){
    const selectMemberCountArea = document.createElement("div");
    this.selectMemberCount = new SelectMemberCount(selectMemberCountArea, { visible : true });
    const tournamentArea = document.createElement("div");
    this.tournament = new Tournament(tournamentArea);
    const finalResultArea = document.createElement("div");
    this.finalResult = new FinalResult(finalResultArea);

    this.element.appendChild(selectMemberCountArea);
    this.element.appendChild(tournamentArea)
    this.element.appendChild(finalResultArea);
  }

  bindEvent(){
    this.selectMemberCount.setOptions({onSelect : this.onSelectMemberCount});
    this.tournament.setOptions({onFinish : this.onFinishTournament});
  }

  onSelectMemberCount=(memberCount)=>{
    this.tournament.start(memberCount);
    this.tournament.show();
    this.selectMemberCount.hide();
  }

  onFinishTournament=(matches)=>{
    this.finalResult.setMatches(matches);
    this.finalResult.show();
    this.tournament.hide();
  }
}
