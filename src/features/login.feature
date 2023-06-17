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