<img width="5760" height="3240" alt="Plugin Cover" src="https://github.com/user-attachments/assets/a4fcaef7-3845-40b9-bacb-54f1dc9d1718" />


# Set Code Syntax
Generate platform-specific Code Syntax for Figma Variables across Web, Android and iOS.

A Figma plugin that helps design-system teams create, review and apply consistent Code Syntax without editing every variable manually.

https://github.com/user-attachments/assets/1206ca96-0936-4da2-b2d0-f68748562e32

<br>

## Features

- Generate Code Syntax for Web, Android and iOS
- Support Color, Number, String and Boolean variables
- Preview all proposed changes before applying
- Edit Boolean names directly in Preview
- Apply a Boolean naming preset: `is-`, `has-`, `show-`, `can-` or `enable-`
- Enter a custom Boolean name or skip an individual variable
- Review Boolean variables without a conventional prefix in a dedicated **Review** tab
- Apply Code Syntax to selected variable collections
- Create new or update existing Code Syntax entries
- Automatically convert spaces and unsupported characters into valid platform-specific syntax
- See visual progress while Code Syntax is being generated and applied
- Use an adaptive interface with Light and Dark themes

<br>

## Installation

Install the plugin from the Figma Community.

👉 [**Open in Figma →**](https://www.figma.com/community/plugin/1641254600210827699/set-code-syntax)

<br>

## How it works

### 1. Configure

Select:

- one or more target platforms;
- the variable types to process;
- the variable collections to update.
<br>
<p align="center">
  <img
    src="https://github.com/user-attachments/assets/fd28c8d2-1035-4c29-9d14-cec268775d1f"
    alt="Configure"
    width="420"
  />
</p>
<br>

### 2. Preview

Review the proposed Code Syntax before applying any changes.

The preview groups variables by collection so you can confirm what will be created or updated.

Boolean variables include additional controls because their naming depends on meaning rather than a fixed conversion rule. Before applying, you can:

- edit the name used to generate Code Syntax;
- apply a preset prefix: `is-`, `has-`, `show-`, `can-` or `enable-`;
- enter a custom name;
- skip an individual Boolean variable.

Boolean variables without a conventional prefix are shown in a dedicated **Review** tab so they can be checked before anything is written.

<br>

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/da2ba545-7523-4e78-b99c-2670cee50d0a"
    alt="Generated Preview and Boolean Review"
    width="960"
  />
</p>

<br>

### 3. Apply

Apply the generated Code Syntax to the selected variable collections.

Visual progress feedback starts as soon as the process begins and continues while the plugin generates and applies the changes.

When complete, the plugin confirms how many Code Syntax entries were:

- created
- updated

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/259d67a1-5eb2-40b7-9b0e-e8ab8ed3a0c7"
    alt="Applying Code Syntax"
    width="420"
  />
</p>

<br>

## Platform output

Different platforms use different naming conventions.

Set Code Syntax converts the same Figma Variable name into appropriate Code Syntax for:

- Web
- Android
- iOS

It also cleans spaces and unsupported characters during generation.

### Example

| Figma Variable | Platform | Generated Code Syntax |
|---|---|---|
| `color/grey/50` | Web | `--color-grey-50` |
| `color/grey/50` | Android | `color_grey_50` |
| `color/grey/50` | iOS | `colorGrey50` |

<br>
<br>

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/76f2bb46-245d-4c6e-a9c3-a998df73aa13"
    alt="Set Code Syntax"
    width="700"
  />
</p>

<br>

## Support

Found a bug or have an idea for an improvement?

[**Open a GitHub Issue →**](https://github.com/Daria-Zoria/set-code-syntax-plugin/issues)

You can also share feedback directly inside the plugin or [send me an email](mailto:zoriadaria@gmail.com).

<br>

## Figma Community

[**Open Set Code Syntax in Figma Community →**](https://www.figma.com/community/plugin/1641254600210827699/set-code-syntax)

## License

Copyright © 2026 Daria Zoria.

All rights reserved.
