@all
Feature: User Authentication tests

  Background: 
    Given User navigates to the application

  @all
  Scenario Outline: Login to SwagLabs
      Given I login to SwagLabs app with username "<username>" and password "<password>"
      Then I print the credential in console

    Examples:
        | username      | password     |
        | standard_user | secret_sauce |

  Scenario: Seed user via API background and login
    Given the following user exists in the system:
      | username      | password     | role     |
      | test_admin    | admin_pass   | admin    |
    When I login to SwagLabs app with username "test_admin" and password "admin_pass"
    Then I print the credential in console