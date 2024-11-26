import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Tarefa {
  name: string;
  activate: boolean;
}

interface Tarefas {
  [idTarefa: string]: Tarefa;  // Mapeia cada ID de tarefa para um objeto Tarefa
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    await this.storage.create();
  }

  // Create - Adiciona uma tarefa
  async addTarefa(userID: string, idTarefa: string, tarefa: any) {
    const tarefas: Tarefas = await this.storage?.get(userID) || {};  // Obtém as tarefas existentes
    tarefas[idTarefa] = tarefa;  // Adiciona
    await this.storage?.set(userID, tarefas);  // Armazena o objeto atualizado
  }

  // Read - Obtém todas as tarefas de um usuário
  async getTarefas(userID: string): Promise<{ id: string; name: string; activate: boolean }[]> {
    let tarefas: Tarefas = await this.storage?.get(userID) || {};  // Obtém as tarefas do usuário ou um objeto vazio
    return Object.entries(tarefas).map(([id, tarefa]) => ({ id, ...tarefa }));  // Retorna um array de tarefas
  }

  // Update - Atualiza uma tarefa existente
  async updateTarefa(userID: string, idTarefa: string, tarefa: any) {
    const tarefas: Tarefas = await this.storage?.get(userID) || {};  // Obtém as tarefas existentes
    if (tarefas[idTarefa]) {  // Verifica se a tarefa existe
      tarefas[idTarefa] = tarefa;  // Atualiza a tarefa
      await this.storage?.set(userID, tarefas);  // Armazena o objeto atualizado
    }
  }

  // Delete - Remove uma tarefa pelo ID
  async removeTarefa(userID: string, idTarefa: string) {
    const tarefas: Tarefas = await this.storage?.get(userID) || {};  // Obtém as tarefas existentes
    if (tarefas[idTarefa]) {  // Verifica se a tarefa existe
      delete tarefas[idTarefa];  // Remove a tarefa
      await this.storage?.set(userID, tarefas);  // Armazena o objeto atualizado
    }
  }
}
