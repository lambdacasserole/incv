<div id="top"></div>



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lambdacasserole/incv">
    <img src="https://raw.githubusercontent.com/lambdacasserole/incv/main/logo.svg" alt="Logo" width="128" height="128">
  </a>

  <h3 align="center">incv</h3>

  <p align="center">
    Simple version bumping tool for Node.js, with customizable tags.
    <br />
    <a href="https://github.com/lambdacasserole/incv/issues">Report Bug</a>
    ·
    <a href="https://github.com/lambdacasserole/incv/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#example-bump-minor-version">Example: Bump Minor Version</a></li>
        <li><a href="#example-from-commit-message">Example: From Commit Message</a></li>
        <li><a href="#example-custom-tags">Example: Custom Tags</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![incv usage][product-screenshot]

Sometimes you need to bump the version in your package.json file automatically. For example, you might:

* Have a CI/CD pipeline, and want to automatically bump the patch version of your library on merge to your `develop` branch
* Have a workflow (e.g. on Bitbucket Pipelines, GitHub actions etc.) that allows developers to automatically perform version bumps by including tags in their commit message (e.g. `[major]`, `[minor]`)
* Just want to reduce the chances of human error when bumping version numbers manually

incv is a command-line utility for doing all of the above.

This is a rough port of my version bumper library for Python, [dodgem](https://github.com/lambdacasserole/dodgem). That name was taken on the npm package registry aready so I went with incv for _increment version_. My imagination was apparently off its game when I created this repo.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This project uses:

* [meow](https://github.com/sindresorhus/meow) for its CLI
* [chalk](https://github.com/chalk/chalk) for colorized CLI output

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Getting started is straightforward.

### Prerequisites

You'll need Node.js 14 or newer with npm to install incv.

### Installation

Install incv using npm and you're done.

```bash
npm install incv --save-dev
```

Test your installation with:

```bash
incv --help
```

You should see help documentation printed.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can use `incv --help` for detailed information on using the utility:

```
Simple version bumping tool for Node.js, with customizable tags.

Usage
  $ incv [options]

Options
  --commit-message, -c  The commit message to use to bump the version (default: '')
  --major-tag           The major version bump tag to search for in commit messages (default: '[major]')
  --minor-tag           The minor version bump tag to search for in commit messages (default: '[minor]')
  --patch-tag           The patch version bump tag to search for in commit messages (default: '[patch]')
  --major               Specifies that a major version bump should be performed (default: false)
  --minor               Specifies that a minor version bump should be performed (default: false)
  --patch               Specifies that a patch version bump should be performed (default: true)
  --dry                 Specifies that the bumped version should not be written to disk (default: false)
  --quiet               Suppresses informational output (default: false)
Boolean options can be inverted by prefixing '--no-' (e.g. '--no-patch').

Examples
  $ incv --major # Major version bump.
  $ incv --commit-message='[major] First major release!' # Major version bump via commit message.
```

### Example: Bump Minor Version

Bump the minor version of your project like this:

```bash
incv --minor
```

If you don't want to commit the change to disk, use `--dry` like so:

```bash
incv --minor --dry
```

If the informational output given by the CLI is getting in the way of downstream processing, use `--quiet`:

```bash
incv --minor --quiet
```

### Example: From Commit Message

Dodgem can bump your project version based on a commit message. By default.

* If the message contains `[major]` then a major version bump will be performed
* If the message contains `[minor]` then a minor version bump will be performed
* Otherwise, a patch version bump will be performed

For example, to use your last `git` commit message to bump your projects version.

```bash
incv --commit-message="$(git log -1)"
```

### Example: Custom Tags

If the default `[major]` and `[minor]` tags don't suit you, and you'd perfer `(major)`, `(minor)` and an _explicit_ `(patch)` tag:

```bash
incv --commit-message="$(git log -1)" --major-tag='(major)' --minor-tag='(minor)' --patch-tag='(patch)' --no-auto-patch
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/lambdacasserole/incv/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Any contributions are very welcome. Please fork the project and open a PR, or open an issue if you've found a bug and/or would like to suggest a feature.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Saul Johnson - [@lambdacasserole](https://twitter.com/lambdacasserole) - saul.a.johnson@gmail.com

Project Link: [https://github.com/lambdacasserole/incv](https://github.com/lambdacasserole/incv)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

The following resources are awesome:

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template) was used for this readme
* [semver](https://www.npmjs.com/package/semver) was used for parsing and bumping semver numbers

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lambdacasserole/incv.svg?style=for-the-badge
[contributors-url]: https://github.com/lambdacasserole/incv/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lambdacasserole/incv.svg?style=for-the-badge
[forks-url]: https://github.com/lambdacasserole/incv/network/members
[stars-shield]: https://img.shields.io/github/stars/lambdacasserole/incv.svg?style=for-the-badge
[stars-url]: https://github.com/lambdacasserole/incv/stargazers
[issues-shield]: https://img.shields.io/github/issues/lambdacasserole/incv.svg?style=for-the-badge
[issues-url]: https://github.com/lambdacasserole/incv/issues
[license-shield]: https://img.shields.io/github/license/lambdacasserole/incv.svg?style=for-the-badge
[license-url]: https://github.com/lambdacasserole/incv/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sauljohnson
[product-screenshot]: https://raw.githubusercontent.com/lambdacasserole/incv/main/usage.svg
