import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  constructor() { }
  imagen_base_64:string | undefined;

  ngOnInit() {
  }

  onFileSelect(event: any){
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagen_base_64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
