export class Item {

  id: number;
  name : string;
  price: number;
  createdDateTime: Date;
  endDateTime: Date;
  image: string;
  description: string;
  isDeleted: boolean;


  constructor(itemName: string,
              price: number,
              createdDateTime: Date,
              endDateTime: Date,
              image: string,
              description: string,
              isDeleted: boolean
  ) {
    this.name = itemName;
    this.price = price;
    this.createdDateTime =  new Date(createdDateTime);
    this.endDateTime = new Date(endDateTime);
    this.image = image;
    this.description = description;
    this.isDeleted = isDeleted;
  }

}
