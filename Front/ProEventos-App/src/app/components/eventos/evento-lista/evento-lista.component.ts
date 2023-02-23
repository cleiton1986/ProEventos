import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef | null;
  public eventos: Evento[] = [];
  public eventosFltrados: Evento[] = [];
  widthImg = 150;
  marginImg = 2;
  exibirImagem = true;
  private filtroListado = '';



  public ngOnInit() : void{
    this.spinner.show();
    this.getEventos();

   /* setTimeout(() => {
      this.spinner.hide();


    }, 5000); */
  }

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
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }


  public alterarImagem(): void {
     this.exibirImagem = !this.exibirImagem;
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
   /* const observer = {
      next:(eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFltrados =this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Error!');
      },
     // complete: () => this.spinner.hide()
    };

    */

    this.eventoService.getEventos().subscribe({
      next:(eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFltrados =this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Error!');
      },
       complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

  }

  confirma() {
     this.modalRef?.hide();
     this.toastr.success('Evento deletado com sucesso.', 'Deletado');
  }

  decline(): void {
    this.modalRef?.hide();
 }

 detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
 }


}
