import { BoardDetailsScreenComponent } from '../board-details-screen/board-details-screen.component'
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BoardlistsService } from '../boardlists.service';

@Component({
  selector: 'app-nav-bars',
  templateUrl: './nav-bars.component.html',
  styleUrls: ['./nav-bars.component.less']
})
export class NavBarsComponent implements OnInit {

  user: any;
  vissible = false
  constructor(public route: Router, public boardService: BoardlistsService) { }

  ngOnInit(): void {
    let current = sessionStorage.getItem('user')
    if(current)
      this.vissible = true
  }

  // ngOnDestroy(): void {
  //   this.vissible = false
  // }

  goToLogin() {
    this.route.navigate(['login'])
  }
  goToHomescreen() {
    this.user = this.boardService.currentUser()
    let name = this.user.userName.replace(/ /g,'')
    this.route.navigate(['home-screen', name])
  }
}


// ********************************* Side nav bar *****************************************

@Component({
  selector: 'app-side-nav-bars',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./nav-bars.component.less']
})
export class SideNavBarComponent implements OnInit {

  title = 'Trello-project';
  sidebar = true;
  action = true;
  createBoard = false;
  currentBoard: any;
  boardName: any;
  bgkColor: any;
  sampleProject: any;
  user: any
  id = this.boardService.index
  prj: any = localStorage.getItem("data")
  prjData: any = JSON.parse(this.prj)
  // projectsList: any = this.prjData
  projectsList: any
  vissible = false;

  constructor(private _router: Router,
              private boardService:BoardlistsService,
              public b: BoardDetailsScreenComponent,
              public http: HttpClient) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((board: any) => this.projectsList = board);
    this.user = this.boardService.currentUser()
    let current = sessionStorage.getItem('user')
    if(current)
      this.vissible = true
  }

  // ngOnDestroy(): void {
  //   this.vissible = false
  // }

  openBoard(board: any){
    sessionStorage.removeItem("boardId")
    sessionStorage.setItem("boardId", board.boardId)
    this._router.navigate(['board-details', board.boardName])
  }

  selectedBackground(color: any, event:any) {
    this.bgkColor = color;
  }

  addNewBoard(boardName: any) {
    if(boardName) {
      if(!this.bgkColor) this.bgkColor = '#bf97ff'
      this.sampleProject = {
        boardName: boardName,
        boardBackground: this.bgkColor,
        boardId: this.boardService.returnBoardIndex(),
        boardLabel:[{tileName: 'To Do'}, {tileName: 'Doing'}, {tileName: 'Done'}]
      }
      // console.log(this.sampleProject)
      this.boardService.setBoards(this.sampleProject)
      this.projectsList = this.boardService.getBoards()
      this.bgkColor = '#fff';
      this.boardName = ''
      // let board = new BoardDetailsScreenComponent(boardList: BoardlistsService,_router: Router)
    }
  }



}
