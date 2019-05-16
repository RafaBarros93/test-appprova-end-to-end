/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/users/sign_in");
    });

    it("sign up in site", () => {
        cy.contains("Entre com sua conta");
    });

    it("email and password in whitespace", () => {
        cy.login();

        cy.get(".alert").should("contain", "Email ou senha inválidos.");
    });

    it("email completed and blank password", () => {
        cy.login("fael1-6@hotmail.com");

        cy.get("input")
            .contains("Entrar")
            .click();

        cy.get(".alert").should("contain", "Email ou senha inválidos.");
    });
});

describe("Simulated", () => {
    beforeEach(() => {
        cy.visit("/users/sign_in");
        cy.login("fael1-6@hotmail.com", "321321321");
    });

    it("initialize new the simulated", () => {
        cy.mockRequest();
    });

    it("initialize new the simulated and do not mark the issues", () => {
        cy.mockRequestEmpty();
    });
});
