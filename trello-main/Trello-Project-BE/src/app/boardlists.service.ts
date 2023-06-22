
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardlistsService {

  project: any;
  index = 0;
  id = 0;
  usrId: any
  prj: any = localStorage.getItem("data")
  prjData: any = JSON.parse(this.prj)
  openedUser: any;
  tempUser: any

  constructor() {}

  setUser(info: any) {
    if(!this.prjData)
      this.prjData= []
    this.prjData.push(info)
    this.storeData()
    console.log("ProjectList - ",this.prjData);
  }

  getUsers():any {
    if(this.prjData){
      const user = of(this.prjData)
      return user;
    }
    return of([])
  }

  currentUser() {
    let temp: any = sessionStorage.getItem('user')
    this.tempUser = JSON.parse(temp)
    this.prjData.find((x: any) =>{
      if(x.userId == this.tempUser.userId)
        this.openedUser = x
      })
    this.storeData()
    return this.openedUser
  }

  getBoards():any {
    if(this.openedUser.boards) {
      const board = of(this.openedUser.boards)
      return board
    }
    return of([])
  }

  returnUserIndex() {
    if(this.prjData)
      this.index = this.prjData.length + 1
    else
      this.index = 1
    return this.index;
  }

  setBoards(data: any) {
    console.log(this.openedUser);
    if(!this.openedUser.boards)
      this.openedUser["boards"] = [];
    this.openedUser.boards.push(data)
    console.log("Set Boards ",this.openedUser);
    this.storeData()
  }

  returnBoardIndex() {
    if(this.openedUser.boards)
      this.index = this.openedUser.boards.length + 1
    else
     this.index = 1
    return this.index;
  }

  storeData() {
    localStorage.setItem("data", JSON.stringify(this.prjData))
  }

  findBoards(id: number) {
    let board = this.openedUser.boards.find((boards: { boardId: number; }) => boards.boardId == id);
    return of(board)
  }

}
