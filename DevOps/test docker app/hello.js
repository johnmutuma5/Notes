var printFam = function (family) { return console.log(family); };
var FamilyPrinter = /** @class */ (function () {
    function FamilyPrinter() {
    }
    FamilyPrinter.prototype.doPrint = function (item) {
        console.log(item);
        return 0;
    };
    return FamilyPrinter;
}());
var familyPrinter = new FamilyPrinter;
familyPrinter.doPrint({
    dad: 'John',
    mom: 'Sheelah',
    daughter: 'Lazuli',
    son: 'Coming soon'
});
