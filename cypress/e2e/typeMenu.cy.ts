import res from './mocks.json';

describe('Type Menu spec', () => {
  let typemenu = res.type_menu.BEBIDAS;
  let typemenu2 = res.type_menu.SANDUICHES;

  it('shoud Create Type Menu 1', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/types-menu`,
      body: typemenu,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      typemenu.id = response.body.id;
    });
  });

  it('shoud Create Type Menu 2', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/types-menu`,
      body: typemenu2,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      typemenu2.id = response.body.id;
    });
  });

  it('should return all Type Menus', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/types-menu`,
      failOnStatusCode: false,
    })
      .its('body.data')
      .should('have.length', 2)
      .then((typeMenus) => {
        cy.log(JSON.stringify(typeMenus));
      });
  });

  it('should return Type Menu by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/types-menu/${typemenu.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((tpMenu) => {
        expect(tpMenu.id).equal(typemenu.id);
        expect(tpMenu.name).equal(typemenu.name);
        cy.log(JSON.stringify(tpMenu));
      });
  });

  it('should Edit Type Menu', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/types-menu/${typemenu.id}`,
      body: res.type_menu.SOBREMESAS,
    })
      .its('body')
      .then((body) => {
        expect(res.type_menu.SOBREMESAS.name).to.eq(body.name);
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Type Menu 1', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/types-menu/${typemenu.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Type Menu 2', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/types-menu/${typemenu2.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });
});
