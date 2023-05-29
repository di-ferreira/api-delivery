import res from './resource.json';

describe('Type Menu spec', () => {
  let typemenu = res.type_menu.BEBIDAS;
  let product2 = res.type_menu.SANDUICHES;

  it('shoud Create Type Menu 1', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/type-menu`,
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
      url: `${res.BASE_URL}/type-menu`,
      body: product2,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      product2.id = response.body.id;
    });
  });

  it('should return all Products', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/type-menu`,
      failOnStatusCode: false,
    })
      .its('body.data')
      .should('have.length', 2)
      .then((products) => {
        cy.log(JSON.stringify(products));
      });
  });

  it('should return Type Menu by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/type-menu/${typemenu.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((pdt) => {
        expect(pdt.id).equal(typemenu.id);
        expect(pdt.name).equal(typemenu.name);
        cy.log(JSON.stringify(pdt));
      });
  });

  it('should Edit Type Menu', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/type-menu/${typemenu.id}`,
      body: res.products['HOT-DOG'],
    })
      .its('body')
      .then((body) => {
        expect(res.products['HOT-DOG'].name).to.eq(body.name);
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Type Menu 1', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/type-menu/${typemenu.id}`,
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
      url: `${res.BASE_URL}/type-menu/${product2.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });
});
