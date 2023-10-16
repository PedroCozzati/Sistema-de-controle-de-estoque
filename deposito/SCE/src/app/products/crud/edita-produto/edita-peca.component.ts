import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edita-peca',
  templateUrl: './edita-peca.component.html',
  styleUrls: ['../../products.component.css']
})
export class EditaPecaComponent {
  peca: any = {}

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.consultaPeca(this.route.snapshot.paramMap.get('id'))
  }

  consultaPeca(id: any) {
    this.http.get(`http://15.229.11.82:90/peca/${id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.peca = response
      })
  }

  editaPeca(peca: any) {
    this.http.put(`http://15.229.11.82:90/peca/${this.peca._id}`, peca, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/pecas'));
      })
  }
}
