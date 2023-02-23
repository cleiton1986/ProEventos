import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
  @Input() titulo = "";
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2023';
  @Input() botaoListar = false;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  listar(): void {

    console.log(`/${this.titulo.toLocaleLowerCase()}/lista`);
     this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
  }

}
