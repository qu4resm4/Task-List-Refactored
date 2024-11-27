import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputTarefa: string = '';
  tarefas: any = null;
  tarefaEmEdicao: any = null;
  idUser: string | null = 'initialized_fail';

  constructor(
    private db: StorageService,
    private authService: AuthService,
    private router: Router
  ) {} // Injeta o AuthService

  // Função para exibir as tarefas
  async exibirTarefas() {
    this.tarefas = null;
    this.tarefas = await this.db.getTarefas(this.idUser || '');
    console.log('EXIBINDO' + this.tarefas);
  }

  // Função para criar uma nova tarefa
  async salvarTarefa() {
    if (this.inputTarefa.trim()) {
      if(this.tarefaEmEdicao != null) {
        // se estiver em edição
        var idTarefa: any = this.tarefaEmEdicao.id
      } else {
        // se não estiver em edição
        var idTarefa: any = uuidv4();
      }
  
      const task = {
        name: this.inputTarefa,
        activate: true
      };

      await this.db.salvarTarefa(this.idUser || '', idTarefa, task);
      this.inputTarefa = '';
      //se estiver em edição, finaliza edição (isso torna o método salvarEdição desnecessário)
      if(this.tarefaEmEdicao != null) {
        this.tarefaEmEdicao = null;
      }
      this.exibirTarefas();
    }
  }

  // Função para editar uma tarefa
  editarTarefa(tarefa: any) {
    this.tarefaEmEdicao = tarefa;
    this.inputTarefa = tarefa.name;
  }

  // Função para excluir uma tarefa
  async excluirTarefa(tarefa: any) {
    await this.db.removeTarefa(this.idUser || '', tarefa.id);
    this.exibirTarefas();
  }

  // Função de logout
  async logout() {
    await this.authService.logout(); // Chama o serviço de logout
  }

  async getUserId() {
    this.idUser = await this.authService.getUserID();
    console.log('UID no Home: ' + this.idUser);
  }

  async init() {
    await this.getUserId();
    await this.exibirTarefas();
  }

  // Função inicial para exibir as tarefas ao carregar a página
  ngOnInit() {
    if(this.getUserId() == null){
      this.router.navigate(['/login']); 
    }
    this.init();
  }
}
