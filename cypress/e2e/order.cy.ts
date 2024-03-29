import { iStatusOrder } from '@ProjectTypes/Order/iOrder';
import res from './mocks.json';

describe('Order spec', () => {
  let customer = { id: 0, ...res.customers.DIEGO };
  let customer2 = { id: 0, ...res.customers.PRISCILA };
  let customer3 = { id: 0, ...res.customers.AQUILES };
  let typeCombo = res.type_menu.COMBO;
  let typeMassas = res.type_menu.MASSAS;
  let typeBebidas = res.type_menu.BEBIDAS;
  let prodHamburguer = res.products.HAMBURGUER;
  let prodHotdog = res.products.HOT_DOG;
  let prodSoda = res.products.SODA;
  let prodJuice = res.products.JUICE;
  let prodPizza = res.products.PIZZA;

  let menuHamburguer = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [prodHamburguer, prodSoda],
    type: typeCombo,
    active: true,
  };

  let menuPizza = {
    ...res.menu.BIG_Pizza,
    products: [prodPizza],
    type: typeMassas,
    active: false,
  };

  let menuCombo = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [prodJuice, prodHotdog],
    type: typeCombo,
    price: 25.0,
    active: true,
  };

  let menuJuice = {
    ...res.menu.JUICE,
    products: [prodJuice],
    type: typeBebidas,
    profit: 50.0,
    price: 0.0,
    active: true,
  };

  let orderAndItems = {
    id: 0,
    status: iStatusOrder.FILA,
    customer: customer,
    obs: 'obs test',
    items: [
      {
        id: 0,
        total: 0.0,
        quantity: 2,
        menu: menuHamburguer,
      },
      {
        id: 0,
        total: 0.0,
        quantity: 2,
        menu: menuJuice,
      },
    ],
  };

  let orderWithoutItems = {
    id: 0,
    status: iStatusOrder.FILA,
    customer: customer3,
    obs: 'obs test',
    items: [],
  };

  let orderWithInactiveItem = {
    id: 0,
    status: iStatusOrder.FILA,
    customer: customer2,
    obs: 'obs test',
    items: [
      {
        id: 0,
        total: 0.0,
        quantity: 1,
        menu: menuPizza,
      },
    ],
  };

  let orderItem = {
    id: 0,
    total: 0.0,
    quantity: 1,
    menu: menuCombo,
    order: {},
  };

  let orderItemInactive = {
    id: 0,
    total: 0.0,
    quantity: 1,
    menu: menuPizza,
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customers`,
      failOnStatusCode: false,
      body: customer,
    }).then((response) => {
      customer.id = response.body.id;
      cy.log(JSON.stringify(customer));
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customers`,
      failOnStatusCode: false,
      body: customer2,
    }).then((response) => {
      customer2.id = response.body.id;
      cy.log(JSON.stringify(customer2));
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customers`,
      failOnStatusCode: false,
      body: customer3,
    }).then((response) => {
      customer3.id = response.body.id;
      cy.log(JSON.stringify(customer3));
    });

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
      body: prodHotdog,
    }).then((response) => {
      prodHotdog.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: prodSoda,
    }).then((response) => {
      prodSoda.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: prodJuice,
    }).then((response) => {
      prodJuice.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: prodPizza,
    }).then((response) => {
      prodPizza.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuPizza,
    }).then((response) => {
      menuPizza = response.body;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuHamburguer,
    }).then((response) => {
      menuHamburguer = response.body;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuJuice,
    }).then((response) => {
      menuJuice = response.body;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menus`,
      body: menuCombo,
    }).then((response) => {
      menuCombo = response.body;
      menuCombo.id = response.body.id;
    });
  });

  it('shoud Create Order and items', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/orders`,
      body: orderAndItems,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      console.log(JSON.stringify(response.body));
      orderAndItems = response.body;
    });
  });

  it('shoud Not Create Order and items with menu inactive', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/menus/${menuPizza.id}`,
      body: { ...menuPizza, active: false },
      failOnStatusCode: false,
    }).then((response) => {
      menuPizza = response.body;

      cy.request({
        method: 'POST',
        url: `${res.BASE_URL}/orders`,
        body: {
          ...orderWithInactiveItem,
          items: [{ menu: response.body }],
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(400).equal(response.status);
        expect('Order cannot have an inactive item').equal(
          response.body.message
        );
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it('shoud Not Create without order item', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/orders`,
      failOnStatusCode: false,
      body: orderWithoutItems,
    }).then((response) => {
      expect(400).equal(response.status);
      expect('Order not have a Items').equal(response.body.message);
    });
  });

  it('shoud Edit Order Status order', () => {
    orderAndItems = { ...orderAndItems, status: iStatusOrder.PRONTO };
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}`,
      body: orderAndItems,
    }).then((response) => {
      expect(200).equal(response.status);
      expect(orderAndItems.status).equal(response.body.status);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('shoud Edit Order OBS', () => {
    orderAndItems = { ...orderAndItems, obs: 'Edited obs' };
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}`,
      body: orderAndItems,
    }).then((response) => {
      expect(200).equal(response.status);
      expect(orderAndItems.obs).equal(response.body.obs);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('should return all Orders', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/orders`,
    })
      .its('body.data')
      .should('have.length', 1)
      .then((items) => {
        cy.log(JSON.stringify(items));
      });
  });

  it('should return Order by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((order) => {
        expect(order.id).equal(orderAndItems.id);
        cy.log(JSON.stringify(order));
      });
  });

  it('shoud Add item to order', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}/item`,
      body: (orderItem = { ...orderItem, order: orderAndItems }),
    }).then((response) => {
      // expect(201).equal(item.status);
      // cy.log(JSON.stringify(response.body));
      // orderItem.id = response.body.id;
    });
  });

  it('shoud Not Add item with menu inactive to order', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/orders/${orderItemInactive.id}/item`,
      body: orderItemInactive,
      failOnStatusCode: false,
    }).then((response) => {
      expect(400).equal(response.status);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('shoud edit item to order', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}/item`,
      body: orderItem,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      orderItem.id = response.body.id;
    });
  });

  it('should remove item from order', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}/item/${orderItem.id}`,
    })
      .its('body')
      .then((order) => {
        expect(order.id).equal(orderAndItems.id);
        cy.log(JSON.stringify(order));
      });
  });

  it('should delete order and items', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/orders/${orderAndItems.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  // after(() => {
  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/menus/${menuPizza.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/menus/${menuHamburguer.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/menus/${menuJuice.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/menus/${menuCombo.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/customers/${customer.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/customers/${customer2.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/customers/${customer3.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/types-menu/${typeCombo.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/types-menu/${typeMassas.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/types-menu/${typeBebidas.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/products/${prodHamburguer.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/products/${prodHotdog.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/products/${prodSoda.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/products/${prodJuice.id}`,
  //     failOnStatusCode: false,
  //   });

  //   cy.request({
  //     method: 'DELETE',
  //     url: `${res.BASE_URL}/products/${prodPizza.id}`,
  //     failOnStatusCode: false,
  //   });
  // });
});
