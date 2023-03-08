const ORDER_MOCK_INSTANCE = {
  id: 1,
  clientId: '64009e3df61ff28f5a74b74f',
  street: 'Rua C',
  number: '155',
  moreInfo: 'no_info',
  cep: '15587963',
  city: 'São Paulo',
  state: 'SP',
  productList: [
    {
      productId: '64009e3df61ff28f5a74se54',
      quantity: 5,
      discount: 122.50,
      actualUnitPrice: 655.98,
    },
  ],
};

const ORDER_MOCK_PAYLOAD = {
  clientId: '6403e8f3bbc977bd9e744a6a',
  street: 'Rua C',
  number: '155',
  moreInfo: 'no_info',
  cep: '15587963',
  city: 'São Paulo',
  state: 'SP',
  productList: [
    {
      productId: '64009e3df61ff28f5a74se54',
      quantity: 5,
      discount: 122.50,
      actualUnitPrice: 655.98,
    },
  ],
};

const PAYMENT_MOCK_PAYLOAD = {
  value: 255.66,
  buyerName: 'Leticia Freitas',
  cardNumber: '4258698874145565',
  expirationDate: '2029-12',
  cvv: '154',
};

module.exports = {
  ORDER_MOCK_INSTANCE,
  ORDER_MOCK_PAYLOAD,
  PAYMENT_MOCK_PAYLOAD,
};
