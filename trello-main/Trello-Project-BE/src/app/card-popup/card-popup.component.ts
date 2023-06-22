import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardlistsService } from '../boardlists.service';
import { project } from '../config/mock-boards';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.less']
})
export class CardPopupComponent implements OnInit {

  @Output() closeCardInfo = new EventEmitter<any>()
  @Input() boardInfo: any
  board:any
  tile:any
  card:any
  value: any
  cmtIndex: any;
  openedChk: any;
  deleteIndex: any;
  visible = true;
  wrapper = false;
  editDes = false;
  newComment = false;
  editCmt = false
  attachLabel = false;
  attachLabel2 = false;
  attachChecklist = false;
  showChk = false;
  cnfmDelete = false;
  showCover = false;
  // activeCover = true;
  activeCover = false;
  temp: any;
  tempParent: any;
  cardCover: any;

  constructor(public boardList: BoardlistsService) { }

  ngOnInit(): void {
    this.board = this.boardInfo[0]
    this.tile = this.boardInfo[1]
    this.card = this.boardInfo[2]
    // console.log(this.board);
    }

  addDescription(content: any) {
    this.card.cardDetails.description = content.value
    this.boardList.storeData()
  }

  addCmt(){
    let comment:any = document.getElementsByClassName('textarea')[0];
    if (comment.value) this.card.cardDetails.comments.push(comment.value);
    comment.value = '';
    this.boardList.storeData()
  }

  deleteCmt(comment: any){
    this.card.cardDetails.comments = this.card.cardDetails.comments.filter(((item: any) => 
      item !== this.card.cardDetails.comments[comment]
    ))
    this.boardList.storeData()
  }

  cmtEdit(comment: any ) {
    this.cmtIndex = comment
    this.editCmt = !this.editCmt
    const cmtContainer = document.getElementsByClassName('cmt-area')[comment]
    cmtContainer.classList.add('hidden')
  }

  showEdit(){
    this.editCmt = !this.editCmt
    const cmtContainer = document.getElementsByClassName('cmt-area')[this.cmtIndex]
    cmtContainer.classList.remove('hidden')
  }

  closeLabel(){
    this.attachLabel = !this.attachLabel
    // let attach = document.getElementById(anchor)?.getBoundingClientRect();
    // let top = attach?.top;
    // let left = attach?.left;
    // console.log(top,left);
    // let label = document.getElementById('label-popup')
    // document.getElementById('label-popup')!.style.color = 'red'
    // console.log(label);
    // label!.style.position = 'absolute';
    // label!.style.top = top +'px';
    // label!.style.left = left + 'px';
  }

  closeLabel2(){
    this.attachLabel2 = !this.attachLabel2
  }

  onClose(){
    this.closeCardInfo.emit(true)
    this.visible = !this.visible;
  }

  closeChecklist(){
    this.attachChecklist = !this.attachChecklist
  }

  thisChk(value: any, event: any) {
    this.openedChk = value;
    this.tempParent = event.target.parentElement
    this.temp = event.target
    this.temp.remove()
  }

  updatePgBar(list: any) {
    let completed = list.listOptions.filter((k: { condition: boolean; }) => k.condition == true)
    list.listProgress = (completed.length/list.listOptions.length)*100
    list.listProgress = list.listProgress.toFixed(0);
    this.boardList.storeData()
  }
  
  deleteOption(list:any ,option: any){
    let index = list.listOptions.indexOf(option)
    list.listOptions.splice(index,1)
    if(list.listOptions.length != 0)
      this.updatePgBar(list)
    else
      list.listProgress = 0
    this.boardList.storeData()
  }

  deleteChk(list: any) {
    this.card.cardDetails.checkList = this.card.cardDetails.checkList.filter((x: any) => x != list)
    this.boardList.storeData()
  }

  addOption(newOption: any, chklist: any){
    if(newOption.value) {
      if(chklist.listOptions){
        chklist.listOptions[chklist.listOptions.length] = { option: newOption.value, condition: false }
      } 
      else
        chklist["listOptions"] = [{ option: newOption.value, condition: false }]
    }
    this.boardList.storeData()
    this.closeAddChk()
    this.updatePgBar(chklist)
  }

  closeAddChk() {
    this.tempParent.append(this.temp)
  }

  passDeleteIndex(currentChk: any) {
    this.deleteIndex = currentChk
  }

  addAttch(attachment: any) {
    let reader = new FileReader();
    reader.readAsDataURL(attachment.target.files[0])
    reader.onload = (e: any) => {
      this.card.cardDetails.attachment.push({
        image: e.target.result, 
        name: attachment.target.files[0].name,
        date: attachment.target.files[0].lastModifiedDate});
    }
    this.boardList.storeData()
  }

  deleteAttachment(attachments: any){
    let index = this.card.cardDetails.attachment.indexOf(attachments);
    this.card.cardDetails.attachment.splice(index,1)
    this.boardList.storeData()
  }

  selectedCover(color: any) {
    if(this.card.cardDetails.cardCover)
      this.card.cardDetails.push({'cardCover': color})
    else
      this.card.cardDetails.cardCover = color
    console.log(this.card.cardDetails);
  }
}


// *************************************Edit Card Component****************************************

@Component({
  selector: 'app-edit-card-popup',
  templateUrl: './edit-card-popup.component.html',
  styleUrls: ['./card-popup.component.less']
})
export class EditCardPopupComponent {
  @Input() boardInfo: any
  @Input() index: any
  @Output() cmtUpdate = new EventEmitter<boolean>();
  board:any
  tile:any
  card:any
  close!:boolean;

  constructor(public boardList:BoardlistsService) {}

  ngOnInit(): void {
    this.board = this.boardInfo[0]
    this.tile = this.boardInfo[1]
    this.card = this.boardInfo[2]
    this.close = true
    
  }

  updateCmt(comment: any){
    if(comment.value) this.card.cardDetails.comments[this.index] = comment.value
    this.boardList.storeData()
  }

  removeCardUpdate(){
    this.close = !this.close
    this.cmtUpdate.emit(this.close)
    this.boardList.storeData()
  }
}


// *****************************************Label Component*************************************************

@Component ({
  selector: 'app-label-popup',
  templateUrl: './label-popup.component.html',
  styleUrls: ['./card-popup.component.less']
})
export class LabelPopupComponent {

  @Output() closeLabel = new EventEmitter
  @Output() closeLabel2 = new EventEmitter
  @Input() boardInfo: any
  card :any

  constructor(public boardList:BoardlistsService) {}

  ngOnInit(): void {
    this.card = this.boardInfo[2]
  }

  toggleLabel(){
    this.closeLabel.emit()
  }

  toggleLabel2(){
    this.closeLabel2.emit()
  }

  addLabel(color: string) {
    let removed = false
    this.card.cardDetails.label.find((item: string) => {
      if(item == color) { 
        let pos = this.card.cardDetails.label.indexOf(color)
        this.card.cardDetails.label.splice(pos, 1)
        removed = true
      }
    })
    this.card.cardDetails.label.push(color)
    if(removed) this.card.cardDetails.label.pop()
    this.card.cardDetails.label = [...new Set(this.card.cardDetails.label)];
    this.boardList.storeData()
  }
}


// ********************************Checklist Component****************************************

@Component ({
  selector: 'app-checklist-popup',
  templateUrl: './checklist-popup.component.html',
  styleUrls: ['./card-popup.component.less']
})
export class ChecklistPopupComponent {

  @Output() closeChecklist = new EventEmitter;
  @Input() boardInfo: any
  card: any

  constructor(public boardList:BoardlistsService) {}

  ngOnInit(): void{
    this.card = this.boardInfo[2]
  }

  closeChk(){
    this.closeChecklist.emit()
  }

  addNewChk(option: any){
    if(option.value) {
      this.card.cardDetails.checkList.push({listTitle: option.value, listProgress: 0})
    }
    this.boardList.storeData()
  }
}
