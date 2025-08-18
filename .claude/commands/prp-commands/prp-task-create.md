# PRP Task Create

Creates focused task-specific PRPs for discrete development tasks.

## Usage
`/prp-task-create [task-description] [scope] [dependencies]`

## Arguments
- `task-description`: Clear description of the specific task
- `scope`: Task scope (small/medium/large)
- `dependencies`: Known dependencies or prerequisites

## Description
This command creates focused PRPs for specific development tasks. These PRPs are optimized for discrete, well-defined tasks that can be completed independently or as part of a larger feature implementation.

## What it does
1. **Task Analysis**: Analyzes the specific task and its requirements in detail
2. **Scope Definition**: Clearly defines task boundaries and deliverables
3. **Context Gathering**: Gathers all necessary context for task completion
4. **Implementation Planning**: Creates step-by-step implementation approach
5. **Validation Setup**: Establishes specific validation criteria for task completion

## Example
```
/prp-task-create "implement JWT token refresh mechanism" "medium" "existing auth system, token storage"
```

This will create a focused PRP for implementing JWT token refresh functionality with clear scope and validation criteria.