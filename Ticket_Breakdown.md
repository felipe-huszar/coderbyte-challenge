# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

[Story 1] Associate agent to custom Id

Description: 
As a Facility, I want to be able to save custom agents IDs for each of my agents, so I can generate reports in the future using my own custom IDs for the agents

Acceptance criterias:
- The agent ID informed to create the association must be a valid agent ID
- Facility should be able to associate any agent to my custom ID

Subtasks:
- Create an associative table (suggestion: Facility_Agents) containing the Agent ID (foreign key), Facility ID (foreign key) and the CustomFacilityAgentID (unique key): 1h
- Create a route at the API and it's respective controller validating the body schema: 0.5h
- Create a repository with a method to associate the Agent ID with the CustomFacilityAgentID: 0.5h
- Create automated tests: 1h

Total estimation: 
- Implementation: 3h
- Manual testing, deployment and bug fixes: 2h


[Story 2] Custom Facility Agent Report

Description: 
As a Facility, I want to be able to generate a report for any of my agents using my own custom ID, containing all the shifts data associated with this agent

Acceptance criterias:
- The facility agent ID should be a valid custom agent ID
- The report should not be generated if the input criteria is not valid
- The process should run asynchronously. Optionaly, the facility should be able to inform an endpoint to receive a webhook once the process has finished. 

Subtasks:
- Create a route at the API and it's respective controller, validating the body schema: 0.5h
- Create a repository with a method that will accept a custom agent ID and return a list of shifts stored for that agent: 2h
- Create, if applicable, indexes at the associative table in order to improve the report's performance: 2h
- Once the report has been successfully generated, the controller should send a POST for the given webhook URL: 2h
- Create automated tests: 2h

Total estimation: 
- Implementation: 10.5h
- Manual testing, including webhooks, deployment and bug fixes: 3h

Dependency: [Story 1]