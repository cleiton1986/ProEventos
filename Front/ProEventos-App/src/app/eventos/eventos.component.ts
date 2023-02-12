import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent  {

  public eventos: any = [];
  public eventosFltrados: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';


  public get filtroLitsta(){
     return this._filtroLista;
  }

  public set filtroLitsta(value: string){
     this._filtroLista = value;
     this.eventosFltrados = this.filtroLitsta ? this.filtroEventos(this.filtroLitsta) : this.eventos;
  }

  filtroEventos(filtroPor: string): any{
     filtroPor = filtroPor.toLocaleLowerCase();
     return this.eventos.filter(
         (evento: {tema:string; local: string})  => evento.tema.toLocaleLowerCase().indexOf(filtroPor) !== -1 ||
         evento.local.toLocaleLowerCase().indexOf(filtroPor) !== -1

     );
  }

  constructor(private http: HttpClient) { }


  alterarImagem(){
     this.exibirImagem = !this.exibirImagem;
  }

  ngOnInit() : void{
    this.getEventos();
  }


  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
        response => {
          this.eventos = response
          this.eventosFltrados = this.eventos;

        },
        error => console.log(error)
    );
  }

}
