import { ProjectDetails } from './../config/project-details';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardlistsService } from '../boardlists.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.less']
})
export class BoardPopupComponent implements OnInit {

  sampleProject: any = [];
  visible = true;
  newProject: any = [];
  // newProject: ProjectDetails | undefined
  data: any;
  bgkColor: any;
  boardName: any;
  id: any;
  @Output() removeCreateBox = new EventEmitter<boolean>();
  
  constructor(public boardList: BoardlistsService) {}
  
  ngOnInit(): void {}

  addNewBoard(value: any) {
    if(!this.bgkColor) this.bgkColor = '#bf97ff'
    this.id = this.boardList.returnBoardIndex()
    this.sampleProject = { boardName: value, boardBackground: this.bgkColor, boardId: this.id, 
      boardLabel:[{tileName: 'To Do'}, {tileName: 'Doing'}, {tileName: 'Done'}]}
    this.boardList.setBoards(this.sampleProject)
    this.boardList.storeData()
  }

  removeCreateBoard(){
    this.removeCreateBox.emit(this.visible)
  }

  selectedBackground(color: any, event:any) {
    this.bgkColor = color;
    let ticks = document.createElement('div')
    ticks.className = 'tick'
    ticks.innerHTML = `<span class="material-icons check">check</span>
                       <style> 
                          .check{
                            position:absolute;
                            top:46%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: #fff;
                            font-size: 20px;
                          }
                       </style>`
    let colors:any = document.getElementsByClassName('colors')
    // Array.from(colors, () => {
    //   if(color.innerHTML.contains('tick'))
    //     color.removeChild('tick')
    // })

    // event.target.appendChild(ticks)
  }
}
