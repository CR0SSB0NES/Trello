import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardlistsService } from '../boardlists.service';
import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/ajax'
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {

  prj: any;
  bgkColor: any;
  boardName: any;
  createTile = false;
  httpInfo: any
  user: any
  rndColor: any

  constructor(private _router: Router, public activeRouter: ActivatedRoute, private boardList:BoardlistsService) {}

  ngOnInit(){
    this.activeRouter.paramMap.subscribe(a => {
      console.log(a);
    })
    this.user = this.boardList.currentUser()
    this.getData();
    this.getRandomColor()
    sessionStorage.removeItem('boardId')
  }

  openBoard(board: any){
    sessionStorage.setItem("boardId", board.boardId)
    this._router.navigate(['board-details', board.boardName])
  }

  // openBoard(board: any) {
  //   sessionStorage.setItem("boardId", board.boardId)
  //   // this.boardList.openedBoard(board.boardId)
  //   let transfer = [board.boardName, board.boardId]
  //   this._router.navigate(['board-details', board.boardName], {state: transfer})
  // }

  visibility(key: any){
    if(key) this.createTile = !this.createTile;
    // this.getData();
  }

  getData(): void {
    this.boardList.getBoards().subscribe((board: any) => this.prj = board);
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.rndColor = color;
  }

  // setRandomColor() {
  //   $("#colorpad").css("background-color", this.getRandomColor());
  // }



}
