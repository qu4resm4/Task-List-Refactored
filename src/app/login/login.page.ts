import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';   
  password: string = ''; 
  isAuthenticated: boolean = false; 
  userId: string = '';

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth, 
    private toastController: ToastController, 
    private loadingController: LoadingController, 
    private router: Router,
    private setHome: HomePage
  ) {}

  async getIdUser() {
     return await this.userId;
  }

  // Função de login
  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();  
      this.isAuthenticated = true; 
      
      // Obtém o UID do usuário
      this.userId = await userCredential.user?.uid || 'FALHA';
      if(this.userId == 'FALHA') {
        this.showToast('Falha na conexão, conecte-se novamente a conta');
      }
      await this.auth.setUserID(this.userId);
      console.log('UID do usuário:', this.userId);

      this.showToast('Login bem sucedido'); 

      //Associa o ID do usuário na interface da aplicação
      await this.setHome.getUserId();
      //Associa as tarefas já guardadas na interface da aplicação
      await this.setHome.exibirTarefas();

      // Redireciona pra página Home
      await this.router.navigate(['/home']); 

    } catch (error) {
      await loading.dismiss();  
      this.showToast('E-mail ou senha incorretos.'); 
    }
  }

   // Função pra logout
   async logout() {
    await this.afAuth.signOut();
    this.showToast('Desconectado com sucesso!');

    // Redireciona pra a tela de login
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
