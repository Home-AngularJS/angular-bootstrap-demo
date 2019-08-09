import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  editForm: FormGroup;
  selectedProduct;
  selectedProductId;
  idMpsCards;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      productId: [''],
      idMps: [''],
      symbolMps: [''],
      startRange: [''],
      endRange: [''],
      description: [''],
      host: ['']
    });

    /**
     * PROD. Profile
     */


    /**
     * DEV. Profile
     */
    this.products = this.dataService.findAllProducts();
    this.idMpsCards = this.dataService.findAllMpsCards();
  }

  public createProduct() {
    const product: any = {
      "productId": null,
      "idMps": null,
      "symbolMps": null,
      "startRange": 0,
      "endRange": 0,
      "description": null,
      "host": "0.0.0.0"
    };
    console.log(product)
    this.selectedProduct = product;
    this.editForm.setValue(product);
  }

  public selectProduct(product) {
    console.log(product);
    this.selectedProduct = product;
    this.editForm.setValue(product);
  }

  public selectProductId(product) {
    if (this.selectedProductId === product.productId) {
      this.selectProduct(product);
    } else {
      this.selectedProductId = product.productId;
    }
  }

  public closeProduct() {
    this.selectedProduct = null;
  }

  public selectIdMps(idMps) {
    const mpsId = idMps.toString().substr(3, idMps.size);
    for (let i = 0; i < this.idMpsCards.length; i++) {
      if (this.idMpsCards[i].mpsId === mpsId) {
        this.selectedProduct.idMps = mpsId;
        this.selectedProduct.symbolMps = this.idMpsCards[i].symbol;
        console.log(this.selectedProduct);
      }
    }
  }

  public onSubmit() {
    const product = this.editForm.value;
    product.symbolMps = this.selectedProduct.symbolMps;
    if (product.productId === null) {
      this.dataService.createProduct(product);
      // this.pageRefresh(); // created successfully.
      this.closeProduct();
    } else {
      this.dataService.updateProduct(product);
      // this.pageRefresh(); // updated successfully.
      this.closeProduct();
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
