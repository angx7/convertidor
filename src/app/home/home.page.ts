import { Component } from '@angular/core';
import { unit } from 'mathjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: string = 'Conversor de longitud';
  value: any;
  result: number;
  selectedOptionFinal: string;
  selectedUnitType: string = 'longitud';
  selectedOptionInitial: string;
  unitOptions: Array<{ value: string; label: string }> = [];
  unitOptionsMap: {
    [key in 'longitud' | 'masa' | 'temperatura']: Array<{
      value: string;
      label: string;
    }>;
  } = {
    longitud: [
      { value: 'mm', label: 'mm' },
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
      { value: 'hm', label: 'hm' },
      { value: 'km', label: 'km' },
    ],
    masa: [
      { value: 'mg', label: 'mg' },
      { value: 'g', label: 'g' },
      { value: 'kg', label: 'kg' },
      { value: 'ton', label: 'ton' },
    ],
    temperatura: [
      { value: 'c', label: 'Celsius' },
      { value: 'f', label: 'Fahrenheit' },
      { value: 'k', label: 'Kelvin' },
    ],
  };
  constructor() {
    this.selectedOptionInitial = '';
    this.selectedOptionFinal = '';
    this.value = null;
    this.result = 0;
    this.updateUnitOptions();
    this.updateTitle();
  }
  onUnitTypeChange() {
    this.updateUnitOptions();
    this.updateTitle();
  }

  updateUnitOptions() {
    this.unitOptions =
      this.unitOptionsMap[
        this.selectedUnitType as 'longitud' | 'masa' | 'temperatura'
      ];
  }

  calculate() {
    // this.result = unit(this.value, this.selectedOptionInitial).toNumber(
    //   this.selectedOptionFinal
    // );
    if (this.selectedUnitType === 'temperatura') {
      this.result = this.convertTemperature(
        this.value,
        this.selectedOptionInitial,
        this.selectedOptionFinal
      );
    } else {
      this.result = unit(this.value, this.selectedOptionInitial).toNumber(
        this.selectedOptionFinal
      );
    }
  }
  convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === 'c' && toUnit === 'f') {
      return (value * 9) / 5 + 32;
    } else if (fromUnit === 'f' && toUnit === 'c') {
      return ((value - 32) * 5) / 9;
    } else if (fromUnit === 'c' && toUnit === 'k') {
      return value + 273.15;
    } else if (fromUnit === 'k' && toUnit === 'c') {
      return value - 273.15;
    } else if (fromUnit === 'f' && toUnit === 'k') {
      return ((value - 32) * 5) / 9 + 273.15;
    } else if (fromUnit === 'k' && toUnit === 'f') {
      return ((value - 273.15) * 9) / 5 + 32;
    } else {
      return value; // Si las unidades son las mismas, devolver el valor original
    }
  }

  updateTitle() {
    switch (this.selectedUnitType) {
      case 'longitud':
        this.title = 'Conversor de longitud';
        break;
      case 'masa':
        this.title = 'Conversor de masa';
        break;
      case 'temperatura':
        this.title = 'Conversor de temperatura';
        break;
    }
  }
}
