import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    private router: Router,
    private setHome: HomePage
  ) {}

  // Função de login
  async login() {
    const loading = await this.auth.loading()
    await loading.present();

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();  
      this.isAuthenticated = true; 
      
      // Obtém o UID do usuário
      this.userId = await userCredential.user?.uid || 'FALHA';
      if(this.userId == 'FALHA') {
        this.auth.showToast('Falha na conexão, conecte-se novamente a conta');
      }
      await this.auth.setUserID(this.userId);
      console.log('UID do usuário:', this.userId);

      this.auth.showToast('Login bem sucedido'); 

      //Associa o ID do usuário na interface da aplicação
      await this.setHome.getUserId();
      //Associa as tarefas já guardadas na interface da aplicação
      await this.setHome.exibirTarefas();

      // Redireciona pra página Home
      await this.router.navigate(['/home']); 

    } catch (error) {
      await loading.dismiss();  
      this.auth.showToast('E-mail ou senha incorretos.'); 
    }
  }

   // Função pra logout
   async logout() {
    await this.afAuth.signOut();
    this.auth.showToast('Desconectado com sucesso!');

    // Redireciona pra a tela de login
    this.router.navigate(['/login']);
  }
}
