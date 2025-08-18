# PRP Analyze Run

Analyzes existing PRPs and executes them with real-time monitoring and adaptation.

## Usage
`/prp-analyze-run [prp-file] [execution-mode] [monitoring-level]`

## Arguments
- `prp-file`: Path to the PRP file to analyze and execute
- `execution-mode`: Execution mode (interactive/headless/streaming)
- `monitoring-level`: Level of monitoring (basic/detailed/debug)

## Description
This command analyzes an existing PRP for completeness and executability, then runs it with intelligent monitoring and adaptive execution. It can detect issues during execution and make real-time adjustments.

## What it does
1. **PRP Analysis**: Analyzes the PRP for completeness, clarity, and executability
2. **Pre-execution Validation**: Validates that all prerequisites and context are available
3. **Intelligent Execution**: Executes the PRP with adaptive strategies based on real-time feedback
4. **Progress Monitoring**: Provides real-time monitoring of execution progress and issues
5. **Adaptive Resolution**: Automatically adapts to unexpected issues during execution

## Example
```
/prp-analyze-run "PRPs/user-authentication.md" "interactive" "detailed"
```

This will analyze the user authentication PRP, validate its completeness, and execute it with detailed monitoring and interactive feedback.