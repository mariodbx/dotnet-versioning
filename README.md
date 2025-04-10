# :warning: WORK IN PROGRESS :warning:

This action is still in an experimental phase, to use with discretion.

# Dotnet Versioning GitHub Action

This GitHub Action automates the process of bumping the version in `.csproj`
files based on commit messages. It is designed to streamline version management
in CI/CD workflows for .NET projects.

## Features

- **Automatic Version Bumping**: Updates the `Version` property in `.csproj`
  files based on commit messages.
- **Customizable Inputs**: Configure the action to suit your project's structure
  and requirements.
- **Git Integration**: Commits and pushes the updated `.csproj` file with a
  customizable commit message.

---

## Usage

To use this action in your workflow, include it in your `.github/workflows` YAML
file. Ensure that your `.csproj` file contains a `Version` property for this
action to work.

### Example Workflow

```yml
name: Bump Versionpm

on:
  push:
    branches:
      - main

jobs:
  version-bump:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Run Dotnet Version Bump Action
        uses: ./ # Use the local action or replace with the repository path
        with:
          csproj_depth: 1
          csproj_name: '*.csproj'
          commit_user: 'github-actions'
          commit_email: 'github-actions@users.noreply.github.com'
          commit_message_prefix: 'chore: bump version to '
```

---

## Inputs

| Input Name              | Description                                             | Required | Default Value                             |
| ----------------------- | ------------------------------------------------------- | -------- | ----------------------------------------- |
| `csproj_depth`          | Depth to search for `.csproj` files.                    | No       | `1`                                       |
| `csproj_name`           | Name pattern for `.csproj` files to locate.             | No       | `*.csproj`                                |
| `commit_user`           | Git username for committing changes.                    | No       | `github-actions`                          |
| `commit_email`          | Git email for committing changes.                       | No       | `github-actions@users.noreply.github.com` |
| `commit_message_prefix` | Prefix for the commit message when bumping the version. | No       | `chore: bump version to `                 |

---

## Outputs

| Output Name       | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `skip_release`    | Indicates whether the release was skipped.            |
| `bump_type`       | The type of version bump (`patch`, `minor`, `major`). |
| `current_version` | The current version before the bump.                  |
| `new_version`     | The new version after the bump.                       |

---

## Requirements

- **Version Property in `.csproj`**: Ensure your `.csproj` file contains a
  `Version` property. For example:

  ```xml
  <PropertyGroup>
    <Version>0.0.0.0</Version>
  </PropertyGroup>
  ```

- **Node.js**: This action requires Node.js to run.

---

## How It Works

1. **Commit Message Parsing**:

   - The action extracts the first 5 alphanumeric characters from the latest
     commit message to determine the bump type (`patch`, `minor`, or `major`).
   - If the commit message does not indicate a bump type, the action skips the
     release.

2. **Version Bumping**:

   - The action reads the `Version` property from the `.csproj` file.
   - It calculates the new version based on the bump type and updates the
     `.csproj` file.

3. **Git Commit**:
   - The updated `.csproj` file is committed and pushed to the repository with a
     customizable commit message.

---

## Notes

- Ensure the `csproj_depth` and `csproj_name` inputs are correctly set to locate
  your `.csproj` file.
- The action will skip the release if the commit message does not indicate a
  valid bump type (`patch`, `minor`, or `major`).
