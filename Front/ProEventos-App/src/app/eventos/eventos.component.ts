
import { Component, TemplateRef } from '@angular/core';
import { Evento } from 'models/Evento';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],

})
export class EventosComponent  {
  modalRef?: BsModalRef | null;
  public eventos: Evento[] = [];
  public eventosFltrados: Evento[] = [];
  widthImg = 150;
  marginImg = 2;
  exibirImagem = true;
  private filtroListado = '';


  public get filtroLitsta(){
     return this.filtroListado;
  }

  public set filtroLitsta(value: string){
     this.filtroListado = value;
     this.eventosFltrados = this.filtroLitsta ? this.filtroEventos(this.filtroLitsta) : this.eventos;
  }

  public filtroEventos(filtroPor: string): Evento[]{
     filtroPor = filtroPor.toLocaleLowerCase();
     return this.eventos.filter(
         (evento: {tema:string; local: string})  => evento.tema.toLocaleLowerCase().indexOf(filtroPor) !== -1 ||
         evento.local.toLocaleLowerCase().indexOf(filtroPor) !== -1

     );
  };

  constructor(private eventoService: EventoService,
    private modalService: BsModalService) { }


  public alterarImagem(): void {
     this.exibirImagem = !this.exibirImagem;
  }

  public ngOnInit() : void{
    this.getEventos();
  }


 // public getEventos(): void{
   // this.eventoService.getEventos().subscribe(
     //   (eventosResp: Evento[]) => {
       //   this.eventos = eventosResp
        //  this.eventosFltrados = this.eventos;

       // },
       // error => console.log(error)
    //);
  //}

  public getEventos(): void{
    const observer = {
      next:(eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFltrados =this.eventos;
      },

      error: (error: any) => console.log(error)
    };

    this.eventoService.getEventos().subscribe(observer);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  confirm() {
     this.modalRef?.hide();
  }

  decline() {
    this.modalRef?.hide();
 }


}
