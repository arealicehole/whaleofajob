# Create Planning Parallel

Creates comprehensive planning documents using parallel analysis streams for rapid development.

## Usage
`/create-planning-parallel [project-scope] [timeline] [resources]`

## Arguments
- `project-scope`: Scope of the planning effort (feature/epic/project)
- `timeline`: Target timeline or deadline
- `resources`: Available resources and constraints

## Description
This command generates detailed planning documents by running parallel analysis of requirements, technical architecture, resource allocation, and risk assessment. Optimized for situations where comprehensive planning needs to be done quickly.

## What it does
1. **Parallel Requirement Analysis**: Simultaneously analyzes functional and non-functional requirements
2. **Architecture Planning**: Creates technical architecture and design decisions in parallel
3. **Resource Planning**: Analyzes resource needs, timeline, and dependencies
4. **Risk Assessment**: Identifies and plans mitigation for potential risks
5. **Documentation Generation**: Creates comprehensive planning documents with visual diagrams

## Example
```
/create-planning-parallel api-redesign "6 weeks" "2 backend devs, 1 frontend dev"
```

This will create comprehensive planning documentation for an API redesign project with timeline and resource constraints.