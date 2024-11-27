import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private auth: AuthService
  ) {}

  async register() {
    const loading = await this.auth.loading();
    await loading.present();

    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();
      this.auth.showToast('Cadastro efetuado com sucesso!');
      
      // Redireciona pro login
      this.router.navigate(['/login']);
    } catch (error) {
      await loading.dismiss();
      this.auth.showToast('Erro na conexão.');
    }
  }
}
