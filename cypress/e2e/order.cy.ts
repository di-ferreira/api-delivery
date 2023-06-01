import { iStatusOrder } from '@ProjectTypes/Order/iOrder';
import res from './mocks.json';

describe('Order spec', () => {
  let customer = { id: 0, ...res.customers.DIEGO };
  let customer2 = { id: 0, ...res.customers.PRISCILA };
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
  };

  let menuPizza = {
    ...res.menu.BIG_Pizza,
    products: [prodPizza],
    type: typeMassas,
    active: true,
  };

  let menuCombo = {
    ...res.menu.COMBO_HAMBURGUER,
    products: [prodJuice, prodHotdog],
    type: typeCombo,
    price: 25.0,
  };

  let menuJuice = {
    ...res.menu.JUICE,
    products: [prodJuice],
    type: typeBebidas,
    profit: 50.0,
    price: 0.0,
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
    customer: customer2,
    obs: 'obs test',
    items: [],
  };

  let orderWithInactiveItem = {
    id: 0,
    status: iStatusOrder.FILA,
    customer: customer,
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
      url: `${res.BASE_URL}/customer`,
      failOnStatusCode: false,
      body: customer,
    }).then((response) => {
      customer.id = response.body.id;
      cy.log(JSON.stringify(customer));
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customer`,
      failOnStatusCode: false,
      body: customer2,
    }).then((response) => {
      customer2.id = response.body.id;
      cy.log(JSON.stringify(customer2));
    });

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
      url: `${res.BASE_URL}/type-menu`,
      body: typeMassas,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body.id);
      typeMassas = { ...typeMassas, id: response.body.id };
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/type-menu`,
      body: typeBebidas,
      failOnStatusCode: false,
    }).then((response) => {
      typeBebidas.id = response.body.id;
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
      body: prodHotdog,
    }).then((response) => {
      prodHotdog.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/product`,
      body: prodSoda,
    }).then((response) => {
      prodSoda.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/product`,
      body: prodJuice,
    }).then((response) => {
      prodJuice.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/product`,
      body: prodPizza,
    }).then((response) => {
      prodPizza.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menu`,
      body: menuPizza,
    }).then((response) => {
      menuPizza.id = response.body.id;
    });

    menuPizza = { ...menuPizza, active: false };

    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/menu`,
      body: menuPizza,
      failOnStatusCode: false,
    }).then((response) => {
      menuPizza.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menu`,
      body: menuHamburguer,
    }).then((response) => {
      menuHamburguer.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menu`,
      body: menuJuice,
    }).then((response) => {
      menuJuice.id = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/menu`,
      body: menuCombo,
    }).then((response) => {
      menuCombo.id = response.body.id;
    });
  });

  it('shoud Create Order and items', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/order`,
      body: orderAndItems,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      orderAndItems.id = response.body.id;
    });
  });

  it('shoud Create Order and items with menu inactive', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/order`,
      body: orderWithInactiveItem,
      failOnStatusCode: false,
    }).then((response) => {
      expect(400).equal(response.status);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('shoud Create without order item', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/order`,
      failOnStatusCode: false,
      body: orderWithoutItems,
    }).then((response) => {
      expect(400).equal(response.status);
    });
  });

  it('shoud Edit Order Status order', () => {
    orderAndItems = { ...orderAndItems, status: iStatusOrder.PRONTO };
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/order/${orderAndItems.id}`,
      body: orderAndItems,
    }).then((response) => {
      expect(200).equal(response.status);
      expect(orderAndItems.status).equal(response.body.status);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('shoud Add item to order', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/order/${orderAndItems.id}/item`,
      body: orderItem,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      orderItem.id = response.body.id;
    });
  });

  it('shoud Add item with menu inactive to order', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/order/${orderItemInactive.id}/item`,
      body: orderItemInactive,
      failOnStatusCode: false,
    }).then((response) => {
      expect(400).equal(response.status);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('shoud Edit item order', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/order/${orderAndItems.id}/item/${orderItem.id}`,
      body: { ...orderItem, quantity: 3 },
    }).then((response) => {
      expect(200).equal(response.status);
      expect(response.body.id).equal(orderItem.id);
      expect(response.body.quantity).equal(3);
      cy.log(JSON.stringify(response.body));
    });
  });

  it('should return all Item from Order', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/order/${orderAndItems.id}/item`,
    })
      .its('body.data')
      .should('have.length', 3)
      .then((items) => {
        cy.log(JSON.stringify(items));
      });
  });

  it('should return Item order by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/order/${orderAndItems.id}/item/${orderItem.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((item) => {
        expect(item.id).equal(orderItem.id);
        cy.log(JSON.stringify(item));
      });
  });

  it('should remove item from order', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/order/${orderAndItems.id}/item/${orderItem.id}`,
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
      url: `${res.BASE_URL}/order/${orderAndItems.id}`,
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
      url: `${res.BASE_URL}/menu/${menuPizza.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menu/${menuHamburguer.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menu/${menuJuice.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/menu/${menuCombo.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customer/${customer.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customer/${customer2.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/type-menu/${typeCombo.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/type-menu/${typeMassas.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/type-menu/${typeBebidas.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodHamburguer.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodHotdog.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodSoda.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodJuice.id}`,
      failOnStatusCode: false,
    });

    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/product/${prodPizza.id}`,
      failOnStatusCode: false,
    });
  });
});
