# User Story Rapid

Rapidly converts user stories into executable PRPs with full implementation context.

## Usage
`/user-story-rapid [user-story] [acceptance-criteria] [priority]`

## Arguments
- `user-story`: The user story in standard format
- `acceptance-criteria`: List of acceptance criteria
- `priority`: Priority level and urgency

## Description
This command takes user stories and rapidly transforms them into comprehensive, executable PRPs. It bridges the gap between product requirements and technical implementation by adding all necessary technical context and implementation details.

## What it does
1. **Story Analysis**: Analyzes the user story for technical requirements and implications
2. **Context Enrichment**: Adds technical context, patterns, and implementation approaches
3. **Acceptance Mapping**: Maps acceptance criteria to technical validation steps
4. **Implementation Planning**: Creates detailed implementation blueprint with validation loops
5. **PRP Generation**: Generates a complete PRP ready for immediate execution

## Example
```
/user-story-rapid "As a user, I want to reset my password so that I can regain access to my account" "Email verification, secure token, password strength validation" "P1"
```

This will convert the password reset user story into a comprehensive PRP with full technical implementation details and validation steps.