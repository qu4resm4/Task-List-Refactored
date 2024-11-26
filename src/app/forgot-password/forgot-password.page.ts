import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(private authService: AuthService, private alertController: AlertController) {}

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.presentAlert('Sucesso', 'Um e-mail de redefinição de senha foi enviado para o seu endereço.');
    } catch (error) {
      this.presentAlert('Erro', 'Falha ao enviar o e-mail de redefinição. Verifique o e-mail inserido.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
