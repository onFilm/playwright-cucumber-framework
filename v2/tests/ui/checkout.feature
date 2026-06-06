@all @ui @checkout
Feature: Checkout Process

  Background: 
    Given User navigates to the application
    And I login to SwagLabs app with username "standard_user" and password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I click checkout

  Scenario: Complete end-to-end checkout successfully
    When I fill in checkout information with "John", "Doe", and "12345"
    And I continue to the next checkout step
    And I finish the checkout
    Then I should see the checkout complete message

  Scenario: Checkout validation errors
    When I continue to the next checkout step
    Then I should see a checkout error message containing "First Name is required"
