// import stripe from "stripe";
// import "dotenv/config";

const createPrice = async (name, description, amount, stripe) =>{
  const product = await stripe.products.create(
    {
      name: name,
      description: description,
    }
  )

  const getPrice = async (productObj) => {
    const priceObj = await stripe.prices.create({
      unit_amount: amount,
      currency: 'eur',
      product: productObj.id,
    })
    return priceObj;
  }

  const price = await getPrice(product);

  //console.log("productIDDDDDDD", product.id);
  //console.log("priceIDDDDDDD", price.id);

  return price.id;



  /* .then(product => {
    stripe.prices.create({
      unit_amount: 1200,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      product: product.id,
    }).then(price => {
      console.log('Success! Here is your starter subscription product id: ' + product.id);
      console.log('Success! Here is your starter subscription price id: ' + price.id);
    });
  }); */
}

export default createPrice;