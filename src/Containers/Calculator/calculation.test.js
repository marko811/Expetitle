import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Calculator from './index';
import shallow from 'enzyme'

describe('Closing Calculator Formula', () => {
  it('calculate', () => {
    const calculator = new Calculator
    Calculator.state =
    {
      titleInsurance: '', loanAmount: 0, salesPrice: 250000, zipCode: 454545
    }
    const { calculate } = Calculator;
    let sales = 900000
    let medium = 100000
    let high = 1000000
    let calcLow = 0.005
    let calcMedium = 0.00575
    let calcHigh = .00250
    let salesPriceReg1 = 80000
    let salesPriceReg2 = 250000
    let salesPriceReg3 = 1100000
    if (salesPriceReg1 <= medium) {
      const price = salesPriceReg1 * calcMedium
      expect(price).toEqual(460)
      console.log(price, 'LOW')
    }
    if (salesPriceReg2 > medium) {
      const med = medium * calcMedium
      const sales = salesPriceReg2 - medium
      const mul = sales * calcLow
      const title = mul + med
      expect(title).toEqual(1325)
      console.log(title, 'Medium')
    }
    if (salesPriceReg3 > high) {
      const med = 100000 * .00575
      const sales = salesPriceReg3 - medium - medium
      const mul = sales * 0.005
      const title = mul + med
      expect(title).toEqual(5075)
      console.log(title, 'High')
    }
  });
})
