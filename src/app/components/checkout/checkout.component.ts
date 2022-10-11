import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EshopFormService } from 'src/app/services/eshop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eshopForm: EshopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        csecurityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //populate credit card month
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.eshopForm.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonth = data;
    });

    //populate credit card years

    this.eshopForm.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(
      'This email address is ' +
        this.checkoutFormGroup.get('customer').value.email
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    // if the current year equals the selected year, then start with the current mont
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.eshopForm.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonth = data;
    });
  }
}
