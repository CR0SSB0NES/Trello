import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardlistsService } from './boardlists.service';
import { HttpClient } from '@angular/common/http'
import { project } from './config/mock-boards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']

})
export class AppComponent {

  // title = 'Trello-project';
  // sidebar = true;
  // action = true;
  // createBoard = false;
  // currentBoard: any;
  // boardName: any;
  // bgkColor: any;
  // sampleProject: any;
  // id = this.boardService.index
  // prj: any = localStorage.getItem("data")
  // prjData: any = JSON.parse(this.prj)
  // projectsList: any = this.prjData 

  // constructor(private _router: Router, 
  //             private boardService:BoardlistsService,
  //             public http: HttpClient) {}
  
  // ngOninit(){
  //   let info = this.http.get('http://localhost:3000/data')
  //   console.log(info);
    
  // }

  // openBoard(board: any){
  //   this._router.navigate(['home-screen/board-details', board.boardName, board.boardId])   
  // }

  // selectedBackground(color: any, event:any) {
  //   this.bgkColor = color;
  // }

  // addNewBoard(boardName: any) {
  //   if(boardName) {
  //     if(!this.bgkColor) this.bgkColor = '#bf97ff'
  //     this.sampleProject = { 
  //       boardName: boardName, 
  //       boardBackground: this.bgkColor, 
  //       boardId: this.boardService.returnBoardIndex(), 
  //       boardLabel:[{tileName: 'To Do'}, {tileName: 'Doing'}, {tileName: 'Done'}] 
  //     }
  //     // console.log(this.sampleProject)
  //     this.boardService.setBoards(this.sampleProject)
  //     this.projectsList = this.boardService.projectData()
  //     this.bgkColor = '#fff';
  //     this.boardName = ''
  //   }
  // }

}
