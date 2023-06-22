import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BoardlistsService } from '../boardlists.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  isEmail: boolean = false;
  isPsd: boolean = false
  usersList: any

  constructor(private route: Router, private boardService: BoardlistsService) { }

  ngOnInit(): void {
    this.boardService.getUsers().subscribe((users: any) => this.usersList = users);
    sessionStorage.removeItem('user')   
    sessionStorage.removeItem('boardId')
  }

  isFocus() {
    let emailErr: any = document.querySelector('#emailErr')
    emailErr.style.opacity = 0
    let psdErr: any = document.querySelector('#psdErr')
    psdErr.style.opacity = 0
  }
  
  letUser(email: any, psd : any) {
    this.usersList.find(((user: { userName: any, userEmail: any, userPsd: any, userId: any}) => {
      if(user.userEmail === email && user.userPsd === psd) {
        sessionStorage.setItem('user', JSON.stringify(user))
        this.boardService.currentUser()
        let name = user.userName.replace(/\s/g,'')
        this.route.navigate(['home-screen', name])
      }
      else if(user.userEmail == email){
        let psdErr: any = document.querySelector('#psdErr')
        psdErr.style.opacity = 1
        psdErr.style.color = "red"
        psdErr.innerText = "Incorrect password"
      } else if ( user.userPsd == psd) {
        let emailErr: any = document.querySelector('#emailErr')
        emailErr.style.opacity = 1
        emailErr.style.color = "red"
        emailErr.innerText = "Incorrect email"
      } 
    }))
    if(email == '' && psd == ''){
      let emailErr: any = document.querySelector('#emailErr')
      let psdErr: any = document.querySelector('#psdErr')
      emailErr.style.opacity = 1
      emailErr.style.color = "red"
      emailErr.innerText = "Please enter email"
      psdErr.style.opacity = 1
      psdErr.style.color = "red"
      psdErr.innerText = "Please enter password"
    }
  }

  newUser() {
    this.route.navigate(['/signup'])
  }

}


// **************************************SignUp*********************************************

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.less']
})
export class SignupComponent implements OnInit {

  isName!: boolean;
  isEmail!: boolean;;
  isPsd!: boolean;
  psdWarning: any;

  constructor(private boardService: BoardlistsService, public route: Router) { }

  ngOnInit(): void {
    this.isName = false;
    this.isEmail = false;
    this.isPsd = false;
  }

  login() {
    this.route.navigate(['login'])
  }

  newUser(email: any, psd : any, name: any) {
    let index = this.boardService.returnUserIndex();
    if(this.isName && this.isPsd && this.isEmail){
      let data = {
        userName: name,
        userEmail: email,
        userPsd: psd,
        userId: index
      }
      this.boardService.setUser(data)
      this.route.navigate(['login'])
    }  
  }

  focus(id: any){
    if(id == 'nameError'){
      this.setWarning('nameError', 'Please enter first name & lastname')
    } else if(id == 'emailError'){
      this.setWarning('emailError', 'Please enter a valid email')
    } else {
      this.setWarning('psdError', 'Should contain an uppercase, a number & a special character')
    }
  }

  setWarning(errorBox: any, msg: any) {
    let errBox: any = document.querySelector(`#${errorBox}`);
    errBox.classList.remove('hidden')
    errBox.style.color = "#666"
    errBox.innerText = msg
  }

  nameCheck(value: any) {
    if(!value) {
      this.setError('name', 'nameError', "Name can't be blank!")
    } 
    else {
      if(value.search(/[A-Z]/) != -1 && value.search(/[ ]/) != -1) {
        this.isName = true
        this.setSuccess('name', 'nameError')
      }else 
        this.setError('name','nameError', "Please enter lastname")
    }
  }

  emailCheck(value: any) {
    if(!value) {
      this.setError('email', 'emailError', "email can't be blank!")
    } else {
        if(value.search(/[@]/) != -1 && value.search(".com") != -1) {
          this.isEmail = true
          this.setSuccess('email', 'emailError')
        } else
            this.setError('email','emailError', "Please enter a valid email")
    }
  }
  
  psdCheck(value: any) {
    if (value == '') {
      this.setError('psd', 'psdError', "Password can't be blank!");
    } else {
      if (value.search(/[A-Z]/) == -1) {
       this.setError('psd', 'psdError', "Password should contain a capital letter!");
      } else if (value.search(/[0-9]/) == -1) {
          this.setError('psd', 'psdError', "Password should contain a number!");
      } else if (value.search(/[!,@,#,$,%,^,&,*]/) == -1) {
        this.setError('psd', 'psdError', "Password should contain a special character!");
      } else {
          this.isPsd = true
          this.setSuccess('psd', 'psdError');
      }
    }
  }

  setSuccess(id: any, errorBox: any){
    let box: any = document.querySelector(`#${id}`)
    box.style.outline = '2px solid #00b900'
    let errBox: any = document.querySelector(`#${errorBox}`)
    errBox.classList.add('hidden')
  }

  setError(id: any, errorBox: any , msg: string){
    let errBox: any = document.querySelector(`#${errorBox}`);
    errBox.classList.remove('hidden')
    errBox.style.color = "red"
    errBox.innerText = msg
    let box: any = document.querySelector(`#${id}`);
    box.style.outline = '2px solid red';
  }

  

}
