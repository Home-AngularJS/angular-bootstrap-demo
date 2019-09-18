import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToTransaction } from '../../core/model/transaction.model';
import {dtoToProduct} from '../../core/model/product.model';

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
  ipsCardGroups;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      productId: [''],
      productName: [''],
      ipsName: [''],
      ipsSymbol: [''],
      rangeBegin: [''],
      rangeEnd: [''],
      // description: [''],
      // host: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllProducts()
      .subscribe( data => {
          console.log(data)
          const products: any = data.content;
          for (let i = 0; i < products.length; i++) {
            // products[i].ipsName = products[i].ipsCardGroup.ipsName;
            // products[i].ipsSymbol = products[i].ipsCardGroup.ipsSymbol;
            products[i] = dtoToProduct(products[i]);
          }
          this.products = products;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          const ipsCardGroups: any = data.content;
          this.ipsCardGroups = ipsCardGroups;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.products = this.dataService.findAllProducts();
    // this.ipsCardGroups = this.dataService.findAllIpsCardGroups();
  }

  public createProduct() {
    const product: any = {
      'productId': null,
      'productName': null,
      'ipsName': null,
      'ipsSymbol': null,
      'rangeBegin': null,
      'rangeEnd': null,
      // 'description': null,
      // 'host': '0.0.0.0'
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

  public selectIpsCardGroup(id) {
    const mpsId = id.toString().substr(3, id.size);
    for (let i = 0; i < this.ipsCardGroups.length; i++) {
      if (this.ipsCardGroups[i].mpsId === mpsId) {
        this.selectedProduct.ipsCardGroup = mpsId;
        this.selectedProduct.symbolMps = this.ipsCardGroups[i].symbol;
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
    //   if (this.products[i].productId === product.productId && this.products[i].ipsCardGroup === product.ipsCardGroup) {
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
