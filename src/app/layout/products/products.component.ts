import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToProduct, productToUpdate } from '../../core/model/product.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      productId: [''],
      productName: [''],
      ipsName: [''],
      ipsCardGroupId: [''],
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
            products[i] = dtoToProduct(products[i]);
          }
          this.products = products;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          const ipsCardGroups: any = data.content;
          this.ipsCardGroups = ipsCardGroups;
        },
        error => {
          // alert( JSON.stringify(error) );
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

  public onSubmit() {
    const dto = this.productToDto(this.editForm.value);
    const product = productToUpdate(dto);

    if (dto.productId === null) {
      this.apiService.createProduct(product)
        .pipe(first())
        .subscribe(
          data => {
            // this.closeProduct();
            this.showSuccess(product.productName, 'Создать');
            this.pageRefresh(); // updated successfully.
          },
          error => {
            this.showError(product.productName, 'Создать');
          });
    } else {
      this.apiService.updateProduct(dto.productId, product)
        .pipe(first())
        .subscribe(
          data => {
            // this.closeProduct();
            this.showSuccess(product.productName, 'Сохранить');
            this.editForm.setValue(product);
            this.pageRefresh(); // updated successfully.
          },
          error => {
            this.showError(product.productName, 'Сохранить');
          });
    }
  }

  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread
   */
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 20000
    });
  }

  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllProducts()
      .subscribe( data => {
          const products: any = data.content;
          for (let i = 0; i < products.length; i++) {
            products[i] = dtoToProduct(products[i]);
          }
          this.products = products;
          this.showSuccess('Продукты', 'Обновить');
        },
        error => {
          this.showError('Продукты', 'Обновить');
        });

    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          const ipsCardGroups: any = data.content;
          this.ipsCardGroups = ipsCardGroups;
          this.showSuccess('Платежные системы', 'Обновить');
        },
        error => {
          this.showError('Платежные системы', 'Обновить');
        });
  }

  public productToDto(src: any) {
    const entity = Object.assign({}, src); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    // const ipsCardGroup = this.getIpsCardGroupByIpsName(entity.ipsName);
    // entity.ipsCardGroupId = ipsCardGroup.ipsCardGroupId;
    return entity;
  }

  private getIpsCardGroupByIpsName(ipsName: any) {
    for (let i = 0; i < this.ipsCardGroups.length; i++) {
      if (this.ipsCardGroups[i].ipsName === ipsName) {
        return this.ipsCardGroups[i];
      }
    }
    return null;
  }
}
