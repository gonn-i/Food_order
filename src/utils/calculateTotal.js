export default function calculateTotal (cartFood) {
  let result = 0;
  cartFood.map((item) => result+= item.price* item.quantity)
  return result
}