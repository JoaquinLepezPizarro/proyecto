import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  nombre = "Daniela"
  aux: any; 
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  prueba(){
    console.log('hols')
  }
// realiza la navegacion al componente indicado
navigateTo(component: string) {
  this.router.navigate([component]);
}
}
