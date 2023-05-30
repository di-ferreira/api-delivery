import res from './mocks.json';
//TODO update product and menu auto
describe('Menu spec', () => {
  let typeCombo = res.type_menu.COMBO;
  let prodHamburguer = res.products.HAMBURGUER;
  let prodSoda = res.products.SODA;

  let menu = {
    ...res.menu.SODA,
    products: [res.products.SODA],
    type: res.type_menu.BEBIDAS,
  };

  let menuWithProd = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [prodHamburguer, prodSoda],
    type: typeCombo,
  };

  let menuWithoutProd = {
    ...res.menu.BIG_Pizza,
    products: [res.products.PIZZA],
    type: res.type_menu.MASSAS,
  };

  let menuWithPrice = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [res.products.JUICE, res.products['HOT-DOG']],
    type: res.type_menu.COMBO,
    price: 25.0,
  };

  let menuWithProfit = {
    ...res.menu.JUICE,
    products: [res.products.JUICE],
    type: res.type_menu.BEBIDAS,
    profit: 50.0,
    price: 0.0,
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/type-menu`,
      body: typeCombo,
      failOnStatusCode: false,
    }).then((response) => {
      typeCombo.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/product`,
      body: prodHamburguer,
    }).then((response) => {
      prodHamburguer.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/product`,
      body: prodSoda,
    }).then((response) => {
      prodSoda.id = response.body.id;
    });
  });

  it('shoud Create Menu with exists products', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menu`,
      body: menuWithProd,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      menuWithProd.id = response.body.id;
    });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/type-menu/${typeCombo.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodHamburguer.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodSoda.id}`,
      failOnStatusCode: false,
    });
  });

  //   it('shoud Create Menu without products', () => {
  //     cy.request({
  //       method: 'POST',
  //       url: `${res.BASE_URL}/menu`,
  //       body: menu,
  //     }).then((response) => {
  //       expect(400).equal(response.status);
  //       cy.log(JSON.stringify(response.body));
  //       menu.id = response.body.id;
  //     });
  //   });

  //   it('shoud Create Menu and product', () => {
  //     cy.request({
  //       method: 'POST',
  //       url: `${res.BASE_URL}/menu`,
  //       body: menu2,
  //     }).then((response) => {
  //       expect(201).equal(response.status);
  //       cy.log(JSON.stringify(response.body));
  //       menu2.id = response.body.id;
  //     });
  //   });

  //   it('shoud Create Menu with profit', () => {
  //     cy.request({
  //       method: 'POST',
  //       url: `${res.BASE_URL}/menu`,
  //       body: menu2,
  //     }).then((response) => {
  //       expect(201).equal(response.status);
  //       cy.log(JSON.stringify(response.body));
  //       menu2.id = response.body.id;
  //     });
  //   });

  //   it('shoud Create Menu with price', () => {
  //     cy.request({
  //       method: 'POST',
  //       url: `${res.BASE_URL}/menu`,
  //       body: menu2,
  //     }).then((response) => {
  //       expect(201).equal(response.status);
  //       cy.log(JSON.stringify(response.body));
  //       menu2.id = response.body.id;
  //     });
  //   });

  //   it('should return all Menus', () => {
  //     cy.request({
  //       method: 'GET',
  //       url: `${res.BASE_URL}/menu`,
  //       failOnStatusCode: false,
  //     })
  //       .its('body.data')
  //       .should('have.length', 4)
  //       .then((menus) => {
  //         cy.log(JSON.stringify(menus));
  //       });
  //   });

  //   it('should return Menu by ID', () => {
  //     cy.request({
  //       method: 'GET',
  //       url: `${res.BASE_URL}/menu/${menu.id}`,
  //       failOnStatusCode: false,
  //     })
  //       .its('body')
  //       .then((pdt) => {
  //         expect(pdt.id).equal(menu.id);
  //         expect(pdt.name).equal(menu.name);
  //         cy.log(JSON.stringify(pdt));
  //       });
  //   });

  //   it('should Edit Menu', () => {
  //     cy.request({
  //       method: 'PUT',
  //       url: `${res.BASE_URL}/menu/${menu.id}`,
  //       body: res.type_menu.SOBREMESAS,
  //     })
  //       .its('body')
  //       .then((body) => {
  //         expect(res.type_menu.SOBREMESAS.name).to.eq(body.name);
  //         cy.log(JSON.stringify(body));
  //       });
  //   });

  it('should Delete Menu', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menu/${menuWithProd.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  //   it('should Delete Menu 2', () => {
  //     cy.request({
  //       method: 'DELETE',
  //       url: `${res.BASE_URL}/menu/${menu2.id}`,
  //     })
  //       .its('body')
  //       .then((body) => {
  //         cy.wrap(body).should('be.empty');
  //         cy.log(JSON.stringify(body));
  //       });
  //   });
});
