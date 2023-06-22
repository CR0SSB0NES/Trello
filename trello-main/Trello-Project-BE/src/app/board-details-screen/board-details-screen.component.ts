import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BoardlistsService } from '../boardlists.service';
import { project } from '../config/mock-boards';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-details-screen',
  templateUrl: './board-details-screen.component.html',
  styleUrls: ['./board-details-screen.component.less'],
})
export class BoardDetailsScreenComponent implements OnInit {

  projects = project
  title: any;
  bgColor: any;
  brdId: any;
  allowList = false;
  showInfo = false;
  info: any[] = [];
  boardInfo: any
  chosenBoard: any;
  tile: any;
  card: any;
  routerInfo: any
  user: any

  constructor(public boardList: BoardlistsService, private location:Location, public _router: Router) {
    // this.routerInfo = this._router.getCurrentNavigation()!.extras.state
  }

  ngOnInit() {
    this.user = this.boardList.currentUser()
    this.boardList.getBoards().subscribe((board: any[]) => this.info = board);


    // this.routerInfo = this.location.getState();
    // this.brdId = this.routerInfo[1];
    // this.title = this.routerInfo[0];
    // let openedBoard = this.user.boards.find((x: { boardId: any; }) => x.boardId == this.brdId)
    // console.log(openedBoard);
    // this.bgColor = openedBoard!.boardBackground
    // this.currentBoard(this.brdId);
    // console.log(history.state);

    // this.route.paramMap.subscribe((params: ParamMap) => {
      //   this.brdId = params.get('boardId');
      //   this.currentBoard(this.brdId);
    //   let openedBoard = this.user.find((x: { boardId: any; }) => x.boardId == this.brdId)
    //   this.title = openedBoard.boardName;
    //   // let openedBoard = project.find((x: { boardId: any; }) => x.boardId == this.brdId)
    //   console.log(openedBoard);
    //   this.bgColor = openedBoard!.boardBackground
    // });

    this.brdId = sessionStorage.getItem("boardId");
    this.currentBoard(this.brdId);
    let openedBoard = this.user.boards.find((x: { boardId: any; }) => x.boardId == this.brdId);
    this.title = openedBoard.boardName;
    console.log(openedBoard);
    this.bgColor = openedBoard!.boardBackground;
  }

  currentBoard(id: number) {
    this.boardList.findBoards(id).subscribe(x => this.chosenBoard = x);
  }

  openCard(tile: any, card: any) {
    this.showInfo = true;
    this.tile = tile;
    this.card = card;
    this.boardInfo = [this.chosenBoard, this.tile, this.card];
  }

  tileDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.chosenBoard.boardLabel, event.previousIndex, event.currentIndex);
  }

  cardDrop(event: CdkDragDrop<any[]>, tile: any) {
    if (event.previousContainer == event.container) {
      console.log("same container");
      moveItemInArray(tile.cards, event.previousIndex, event.currentIndex)
    }

    // if (event.previousContainer != event.container) {
    // }
    // transferArrayItem(tile.cards, this.chosenBoard.boardLabel[event.previousIndex].cards, event.previousIndex, event.currentIndex);

    // else {
    // console.log("different container");
    // moveItemInArray(tile.cards, event.previousIndex, event.currentIndex);
    // }
    // transferArrayItem( tile.cards,this.chosenBoard.boardLabel[event.previousIndex].cards, event.previousIndex, event.currentIndex);
    this.boardList.storeData()
  }

  closeCardInfo(key: any) {
    if (key) this.showInfo = !this.showInfo;
  }

  createCard(event: any, cards: any) {
    this.cancelCard()
    let button = event.target.closest('#add-new-card');
    button?.classList.add('hide');
    const hiddenCard = document.createElement('div');
    hiddenCard.className = 'hidden-card-menu';
    hiddenCard.innerHTML = `<textarea id="card-name" placeholder="Enter a title for this card..."></textarea>
                              <div class="cards-cnf">
                              <button id="add-card-btn">Add card</button>
                              <div class="card-close" id="card-close">
                                <span class="material-icons card-close">close</span>
                              </div>
                            </div>

                            <style>
                              .cards-cnf { display: flex; position: relative; }
                              .card-close { position: absolute; top:15%; left: 33%; color: #777; }
                              .card-close:hover { color: rgb(0, 32, 90); cursor: pointer }
                              #add-card-btn:hover { background: rgb(1, 78, 150); }
                              #add-card-btn { width: 72px; height: 32px; background: rgb(2, 138, 216);
                                color: #fff; border: 0; border-radius: 3px; margin: 1% 0 2% 2%; }
                              #card-name { font-size: 12px; word-spacing: -2px; display: flex;
                                justify-content: flex-start; width: 95% !important; height: 60px;
                                border: 0; border-radius: 3px; transition: .1s; transform: translateX(2.5%);
                                resize: none; box-shadow: 0px 2px 4px -2px rgb(18 18 18 / 50%); padding: .5rem}
                              #card-name:focus { border: 0; outline: 0; }
                            </style>`;
    const cardCnt = button.closest('#add-card-cnt');
    cardCnt?.appendChild(hiddenCard);
    let cardClose = document.getElementById('card-close');
    cardClose?.addEventListener('click', this.cancelCard.bind(this));
    let saveTitle = document.getElementById('add-card-btn');
    saveTitle?.addEventListener('click', () => this.addCard(cards));
  }

  addCard(cardsList: any) {
    let cardTitle: any = document.getElementById('card-name');
    let value = cardTitle?.value;
    if (value) {
      if (!cardsList.cards) {
        const createdCard: any = this.chosenBoard.boardLabel.find((x: { tileName: any; }) => cardsList.tileName == x.tileName)
        createdCard["cards"] = [{
          cardTitle: value,
          cardDetails: {
            description: '',
            comments: [],
            checkList: [{}],
            attachment: [],
            label: [],
            cover: []
          }
        }];
      } else
        cardsList.cards.push(cardsList = { cardTitle: value })
    }
    this.boardList.storeData()
    this.cancelCard()
  }

  cancelCard() {
    const elem = document.getElementsByClassName('hidden-card-menu')[0];
    const tile = elem?.closest('#tiles-box');
    elem?.parentNode?.removeChild(elem);
    let button = tile?.getElementsByClassName('add-new-card')[0];
    button?.classList?.remove('hide');
  }

  createTile(event: any) {
    if (event.value) {
      if (this.chosenBoard.boardLabel)
        this.chosenBoard.boardLabel.push({ tileName: event.value });
      else this.chosenBoard["boardLabel"] = [{ "tileName": event.value }];
      this.allowList = !this.allowList;
    }
    this.boardList.storeData()
  }
}
