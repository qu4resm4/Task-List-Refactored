import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
  ) {}

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();
      this.showToast('Cadastro efetuado com sucesso!');
      
      // Redireciona pro login
      this.router.navigate(['/login']);
    } catch (error) {
      await loading.dismiss();
      this.showToast('Erro no cadastro. Utilize caracteres maiúsculos, minúsculos, especiais e numéricos.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
