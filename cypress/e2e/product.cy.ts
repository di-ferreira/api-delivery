import res from './mocks.json';

describe('Product spec', () => {
  let product = res.products.HAMBURGUER;
  let product2 = res.products.SODA;

  it('shoud Create Product 1', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
      body: product,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      product.id = response.body.id;
    });
  });

  it('shoud Create Product 2', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/products`,
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
      url: `${res.BASE_URL}/products`,
      failOnStatusCode: false,
    })
      .its('body.data')
      .should('have.length', 2)
      .then((products) => {
        cy.log(JSON.stringify(products));
      });
  });

  it('should return Product by ID', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/products/${product.id}`,
      failOnStatusCode: false,
    })
      .its('body')
      .then((pdt) => {
        expect(pdt.id).equal(product.id);
        expect(pdt.name).equal(product.name);
        cy.log(JSON.stringify(pdt));
      });
  });

  it('should Edit Product', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/products/${product.id}`,
      body: res.products.HOT_DOG,
    })
      .its('body')
      .then((body) => {
        expect(res.products.HOT_DOG.name).to.eq(body.name);
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Product 1', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/products/${product.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Product 2', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/products/${product2.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });
});
