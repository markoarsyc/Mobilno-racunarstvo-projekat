import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage = signal<string | null>(null);

  constructor(private userService: UserService, private router: Router) { }

  submitLoginForm() {
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.userService.login(username, password).subscribe({
      next: (res) => {
        console.log("Login successful:", res);
        this.errorMessage.set(null);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("Greška prilikom prijave. Molimo pokušajte ponovo.");
      }
    });
  }

}
