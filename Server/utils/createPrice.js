
const createPrice = async (name, description, amount, stripe) =>{

  try {
    const product = await stripe.products.create(
      {
        name: name,
        description: description,
      }
    )
  
    const getPrice = async (productObj) => {
      try {
        const priceObj = await stripe.prices.create({
          unit_amount: amount,
          currency: 'eur',
          product: productObj.id,
        })
        return priceObj;
        
      } catch (error) {
        throw error; 
      }
    }
  
    const price = await getPrice(product);
  
    return price.id;
    
  } catch (error) {
    throw error; 
  }


}

export default createPrice;