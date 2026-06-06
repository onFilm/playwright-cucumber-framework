@all @ui @inventory
Feature: Inventory Management and Navigation

  Background: 
    Given User navigates to the application
    And I login to SwagLabs app with username "standard_user" and password "secret_sauce"

  Scenario: Validate inventory sorting
    When I sort items by "lohi"
    And I sort items by "za"

  Scenario: Verify hamburger menu navigation and logout
    When I open the hamburger menu
    And I click logout
