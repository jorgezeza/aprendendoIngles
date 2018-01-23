import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TentativasComponent } from './../tentativas/tentativas.component';
import { Frase } from './../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES
  public instrucao: string = "Traduza a Frase"
  public resposta: string = ""

  public rodada: number = 0
  public rodadaFrase: Frase
  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()


  public progresso: number = 0

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    //console.log(this.resposta)
  }


  public verficarResposta(): void {
    console.log(this.tentativas)
    if (this.rodadaFrase.frasePtBr == this.resposta) {

      // trocar a pergunta de rodada
      this.rodada++

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      //Atualiza o objeto rodadaFrase
      this.atualizaRodada()

    } else {
      //Diminuir a variavel tentativas
      this.tentativas--

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  //Define a frase da rodada com base em alguma lógica
  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    //limpar a resposta
    this.resposta = ""
  }
}
