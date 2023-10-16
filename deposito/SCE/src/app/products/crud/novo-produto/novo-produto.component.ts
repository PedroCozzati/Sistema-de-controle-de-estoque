import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-nova-peca',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['../../products.component.css']
})
export class NovaPecaComponent {
  peca: any = {}

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  criaPeca(peca: any) {
    this.http.post(`http://15.229.11.82:90/peca`, peca, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/pecas'));
      })

  }
}
