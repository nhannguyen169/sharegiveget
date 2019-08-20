import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudProduct } from '../service/firestore/crud.product';
import { CrudUser } from  '../service/firestore/crud.user';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private crudProduct: CrudProduct,
    private activatedRoute: ActivatedRoute,
    private crudUser : CrudUser
  ) { }
  itemId : any;
  products : any;
  users : any;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('itemid');
    //lay thong tin san pham tu firebase qua id
    this.crudProduct.read_Products().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          tensp: e.payload.doc.data()['tensp'],
          loaisp: e.payload.doc.data()['loaisp'],
          img:e.payload.doc.data()['image'],
          date:e.payload.doc.data()['ngaytao'].toDate(),
          note:e.payload.doc.data()['mota'],
          status:e.payload.doc.data()['tinhtrangsp'],
          user:e.payload.doc.data()['user']
        };
      })
    });
    //lay thong tin user tu firebase
    this.crudUser.readUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          userID: e.payload.doc.data()['userID'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          rating:e.payload.doc.data()['rating'],
          numUserRate:e.payload.doc.data()['numberUserRate']
        }
      })
    });
  }
 
}
