@all @api @reqres
Feature: ReqRes User Management API

  Scenario: Fetch a specific user successfully
    When I request the user with ID 2
    Then the API response status should be 200
    And the response should contain valid user data for "Ervin Howell"

  Scenario: Attempt to fetch a non-existent user
    When I attempt to fetch a non-existent user with ID 999
    Then the API response status should be 404

  Scenario: Create a new user successfully
    When I create a new user with name "Morpheus" and job "Leader"
    Then the API response status should be 201

  Scenario: Update an existing user successfully
    When I create a new user with name "Neo" and job "Engineer"
    And I update the user's job to "The One"
    Then the API response status should be 200

  Scenario: Delete a user successfully
    When I create a new user with name "Trinity" and job "Hacker"
    And I delete the user
    Then the API response status should be 200
