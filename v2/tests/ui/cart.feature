@all @ui @cart
Feature: Shopping Cart Management

  Background: 
    Given User navigates to the application
    And I login to SwagLabs app with username "standard_user" and password "secret_sauce"

  Scenario: Validate cart states and badge updates
    Then the cart badge should show 0
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should show 0

  Scenario: Verify items persist in the cart after navigation
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    Then I should see "Sauce Labs Backpack" in the cart
    When I continue shopping
    Then the cart badge should show 1
