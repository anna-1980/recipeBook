// will be used in the shopping list component
export class Ingredient {
// shorthand of constructor(see code below <-><-><-><->) 
   constructor ( public name: string, public amount: number, public unit: string) {}
}


// <-><-><-><-><-><-><-><->
// export class Ingredient {
//     public name: string;
//     public amount: number;
//     constructor(name: string, amount: number) {
//         this.name = name;
//         this.amount = amount;
//     }
// }