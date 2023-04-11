/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        id: 1,
        client_id: '64009e3df61ff28f5a74b74f',
        street: 'Rua C',
        number: '155',
        more_info: 'no_info',
        cep: '15587963',
        city: 'São Paulo',
        state: 'SP',
        product_list: JSON.stringify([
          {
            productId: '64009e3df61ff28f5a74se54',
            productName: 'Samsung S20 FE',
            quantity: 5,
            discount: 122.50,
            actualUnitPrice: 655.98,
          },
        ]),
      },
    ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  },
};
