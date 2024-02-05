export interface Product{
  id:number,
  productName:string,
  productImage:string,
  productCategoryId:number,
  productSubCategoryId:number,
  productPrice:number,
  productQuantity?:number,
  productRating:number
}
