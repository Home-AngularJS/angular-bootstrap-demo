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
      productName: [''],
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
      "productName": null,
      "idMps": null,
      "symbolMps": null,
      "startRange": null,
      "endRange": null,
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
    console.log(product);
    // ////////////////////////////////
    product.symbolMps = this.selectedProduct.symbolMps;
    if (product.productId === null) {
      this.dataService.createProduct(product);
      // this.pageRefresh(); // created successfully.
    } else {
      this.dataService.updateProduct(product);
      // this.pageRefresh(); // updated successfully.
    }
    this.closeProduct();

    // ////////////////////////////////
    // var isUpdateProduct: boolean = false;
    // for (let i = 0; i < this.products.length; i++) {
    //   console.log(this.products[i]);
    //   console.log(product);
    //   if (this.products[i].productId === product.productId && this.products[i].idMps === product.idMps) {
    //     isUpdateProduct = true;
    //     break;
    //   }
    // }
    //
    // if (isUpdateProduct) {
    //   this.dataService.updateProduct(product);
    //   // this.pageRefresh(); // updated successfully.
    //   this.closeProduct();
    // } else {
    //   this.dataService.createProduct(product);
    //   // this.pageRefresh(); // created successfully.
    //   this.closeProduct();
    // }
  }

  public pageRefresh() {
    location.reload();
  }
}