import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  submitRegisterForm() {
    const username = this.registerForm.get('username')?.value || '';
    const email = this.registerForm.get('email')?.value || '';
    const password = this.registerForm.get('password')?.value || '';

    this.userService.register(username, email, password).subscribe({
      next: (res) => {
        console.log("Registration successful:", res);
        this.errorMessage = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Greška prilikom registracije. Molimo pokušajte ponovo.";
      }
    });
  }
}
