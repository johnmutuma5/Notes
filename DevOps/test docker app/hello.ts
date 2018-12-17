type Family = {
  dad: String,
  mom: String,
  daughter: String,
  son: String
}

type dad = Family['dad'];

type GenericPrinter<T> = (arg: T) => void;
const printFam: GenericPrinter<Family> = (family): void => console.log(family);


interface PrinterInterface<T, T2> {
  doPrint: (arg: T, arg2: T2) => number,
}


class FamilyPrinter implements PrinterInterface<Family, number> {
  doPrint(): number {
    console.log(item);
    return 0;
  }
}

const familyPrinter: FamilyPrinter = new FamilyPrinter;

familyPrinter.doPrint({
  dad: 'John',
  mom: 'Sheelah',
  daughter: 'Lazuli',
  son: 'Coming soon'
});
