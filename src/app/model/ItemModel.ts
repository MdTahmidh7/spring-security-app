export class Item {

  id: number;
  name : string;
  price: number;
  createdDate: Date;
  image: string

  constructor(itemName: string,
              price: number,
              date: Date,
              image: string
  ) {
    this.name = itemName;
    this.price = price;
    this.createdDate =  new Date(date);
    this.image = image
  }

}
