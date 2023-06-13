import res from './mocks.json';
describe('Menu spec', () => {
  let typeCombo = res.type_menu.COMBO;
  let typeMassas = res.type_menu.MASSAS;
  let typeBebidas = res.type_menu.BEBIDAS;
  let prodHamburguer = res.products.HAMBURGUER;
  let prodSoda = res.products.SODA;
  let prodPizza = res.products.PIZZA;

  let menuWithProd = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [prodHamburguer, prodSoda],
    type: typeCombo,
  };

  let menuAndProd = {
    ...res.menu.BIG_Pizza,
    products: [prodPizza],
    type: typeMassas,
  };

  let menuEptProd = {
    ...res.menu.BIG_Pizza,
    products: [],
    type: typeMassas,
  };

  let menuWithPrice = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [res.products.JUICE, res.products.HOT_DOG],
    type: typeCombo,
    price: 25.0,
  };

  let menuWithProfit = {
    ...res.menu.JUICE,
    products: [res.products.JUICE],
    type: typeBebidas,
    profit: 50.0,
    price: 0.0,
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/types-menu`,
      body: typeCombo,
      failOnStatusCode: false,
    }).then((response) => {
      typeCombo.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/types-menu`,
      body: typeMassas,
      failOnStatusCode: false,
    }).then((response) => {
      typeMassas.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/types-menu`,
      body: typeBebidas,
      failOnStatusCode: false,
    }).then((response) => {
      typeBebidas.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: prodHamburguer,
    }).then((response) => {
      prodHamburguer.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: prodSoda,
    }).then((response) => {
      prodSoda.id = response.body.id;
    });
  });

  it('shoud Create Menu with exists products', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuWithProd,
    }).then((response) => {
      expect(201).equal(response.status);
      expect(response.body.price).equal(
        prodHamburguer.costPrice + prodSoda.costPrice
      );
      expect(response.body.active).to.equal(true);
      cy.log(JSON.stringify(response.body));
      menuWithProd.id = response.body.id;
    });
  });

  it('shoud Create Menu and products', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuAndProd,
    }).then((response) => {
      expect(201).equal(response.status);
      expect(response.body.price).equal(res.products.PIZZA.costPrice);
      expect(response.body.products[0].name).equal(res.products.PIZZA.name);
      cy.log(JSON.stringify(response.body));
      expect(response.body.products[0].id).gte(0);
      prodPizza.id = response.body.products[0].id;
      menuAndProd.id = response.body.id;
    });
  });

  it('shoud Create Menu with products array empty', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuEptProd,
      failOnStatusCode: false,
    })
      .its('status')
      .should('equal', 400);
  });

  it('shoud Create Menu with profit', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuWithProfit,
    }).then((response) => {
      expect(201).equal(response.status);
      expect(0.75).equal(response.body.price);
      cy.log(JSON.stringify(response.body));
      menuWithProfit.id = response.body.id;
    });
  });

  it('shoud Create Menu with price', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuWithPrice,
    }).then((response) => {
      expect(201).equal(response.status);
      expect(menuWithPrice.price).equal(response.body.price);
      cy.log(JSON.stringify(response.body));
      menuWithPrice.id = response.body.id;
    });
  });

  it('should return all Menus', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/menus`,
    })
      .its('body.data')
      .should('have.length', 4)
      .then((menus) => {
        cy.log(JSON.stringify(menus));
      });
  });

  it('should return Menu by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/menus/${menuWithProd.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((pdt) => {
        expect(pdt.id).equal(menuWithProd.id);
        expect(pdt.name).equal(menuWithProd.name);
        cy.log(JSON.stringify(pdt));
      });
  });

  it('should Edit Menu', () => {
    menuWithProfit = {
      ...menuWithProfit,
      name: 'grape juice',
      description: 'Natural grape juice',
      active: false,
      profit: 100.0,
    };
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/menus/${menuWithProfit.id}`,
      body: menuWithProfit,
    })
      .its('body')
      .then((body) => {
        cy.log(JSON.stringify(body));
        expect(menuWithProfit.name).to.eq(body.name);
        expect(menuWithProfit.description).to.eq(body.description);
        expect(menuWithProfit.active).to.eq(body.active);
        expect(body.price).to.eq(1.0);
      });
  });

  it('should return all Menus actives', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/menus?active=true`,
    })
      .its('body.data')
      .should('have.length', 3)
      .then((menus) => {
        cy.log(JSON.stringify(menus));
      });
  });

  it('should return all Menus inactives', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/menus?active=false`,
    })
      .its('body.data')
      .should('have.length', 1)
      .then((menus) => {
        cy.log(JSON.stringify(menus));
      });
  });

  it('should Delete Menu with product', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menus/${menuWithProd.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Menu without product', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menus/${menuAndProd.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Menu with Profit', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menus/${menuWithProfit.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Menu with Price', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menus/${menuWithPrice.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/types-menu/${typeCombo.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/types-menu/${typeMassas.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/types-menu/${typeBebidas.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/products/${prodHamburguer.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/products/${prodSoda.id}`,
      failOnStatusCode: false,
    });
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/products/${prodPizza.id}`,
      failOnStatusCode: false,
    });
  });
});
