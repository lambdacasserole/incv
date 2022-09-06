#!/usr/bin/env node

import fs from 'fs';
import { exit } from 'process';
import { EOL } from 'os';

import semver from 'semver';
import meow from 'meow';
import chalk from 'chalk';


/**
 * The location of the package.json file on disk.
 */
const PACKAGE_JSON_PATH = './package.json';

/**
 * Whether or not the application is in quiet mode.
 */
let IS_QUIET = false;


/**
 * Reads the text in the file at the specified path.
 *
 * @param {string} path the path of the file to read
 * @returns {Promise<string>} a promise for the file text
 */
function readFileText(path) {
    return new Promise((resolve, reject) => fs.readFile(path, (err, data) => {
        if (err) {
            return reject(err);
        }
        return resolve(data.toString('utf-8'));
    }));
}

/**
 * Writes text to the file at the specified path.
 *
 * @param {string} path the path of the file to write
 * @param {string} text the text to write to the file
 * @returns {Promis<void>} a promise which will resolve on successful file write.
 */
function writeFileText(path, text) {
    return new Promise((resolve, reject) => {
        try {
            return fs.writeFile(path, text, () => {
                return resolve();
            });
        } catch (e) {
            return reject(e);
        }
    });
}

/**
 * Writes an informational message to standard output.
 *
 * @param {string} msg the message to write
 */
function logInfo(msg) {

    // Only write output if quiet mode is not enabled.
    if (!IS_QUIET) {
        process.stdout.write(`${chalk.blue('info:')} ${msg}${EOL}`);
    }
}

/**
 * Writes a fatal error message to standard error and exits the application.
 *
 * @param {string} msg the message to write
 * @param {number} exitCode the exit code to use
 */
function fatal(msg, exitCode = 1) {
    process.stderr.write(`${chalk.red('fatal:')} ${msg}${EOL}`);
    exit(exitCode);
}


(async () => {

    // Parse command-line arguments.
    const cli = meow(`
    Usage
      $ incv [options]

    Options
      --commit-message, -c  The commit message to use to bump the version (default: '')
      --major-tag           The major version bump tag to search for in commit messages (default: '[major]')
      --minor-tag           The minor version bump tag to search for in commit messages (default: '[minor]')
      --patch-tag           The patch version bump tag to search for in commit messages (default: '[patch]')
      --prerelease-tag      The prerelease version bump tag to search for in commit messages (default: '[prerelease]')
      --build-tag           The build version bump tag to search for in commit messages (default: '[build]')
      --prerelease-token    The prerelease token to prepend to the prerelease version (default: 'prerelease')
      --build-token         The build token to prepend to the build version (default: '')
      --major               Specifies that a major version bump should be performed (default: false)
      --minor               Specifies that a minor version bump should be performed (default: false)
      --patch               Specifies that a patch version bump should be performed (default: true)
      --prerelease          Specifies that a prerelease version bump should be performed (default: false)
      --build               Specifies that a build version bump should be performed (default: false)
      --dry                 Specifies that the bumped version should not be written to disk (default: false)
      --quiet               Suppresses informational output (default: false)
    Boolean options can be inverted by prefixing '--no-' (e.g. '--no-patch').

    Examples
      $ incv --major # Major version bump.
      $ incv --commit-message='[major] First major release!' # Major version bump via commit message.
`, {
        importMeta: import.meta,
        flags: {
            commitMessage: {
                type: 'string',
                default: '',
                alias: 'c',
            },
            majorTag: {
                type: 'string',
                default: '[major]',
            },
            minorTag: {
                type: 'string',
                default: '[minor]',
            },
            patchTag: {
                type: 'string',
                default: '[patch]',
            },
            prereleaseTag: {
                type: 'string',
                default: '[prerelease]',
            },
            buildTag: {
                type: 'string',
                default: '[patch]',
            },
            prereleaseToken: {
                type: 'string',
                default: 'prerelease',
            },
            buildToken: {
                type: 'string',
                default: '',
            },
            major: {
                type: 'boolean',
            },
            minor: {
                type: 'boolean',
            },
            patch: {
                type: 'boolean',
                default: true,
            },
            prerelease: {
                type: 'boolean',
            },
            build: {
                type: 'boolean',
            },
            dry: {
                type: 'boolean',
            },
            quiet: {
                type: 'boolean',
            },
        },
    });

    // Globalize quiet flag.
    IS_QUIET = cli.flags.quiet;

    // Load raw package data.
    let rawPackageData;
    try {
        rawPackageData = await readFileText(PACKAGE_JSON_PATH);
    } catch (e) {
        fatal('Could not read package.json file.');
    }

    // Deserialize package data.
    let packageData;
    try {
        packageData = JSON.parse(rawPackageData);
    } catch (e) {
        fatal('Could not parse package.json file.');
    }

    // Parse current version.
    let rawCurrentVersion = packageData.version;
    let currentVersion = semver.parse(rawCurrentVersion);
    if (!currentVersion) {
        fatal('Could not parse version in package.json file.');
    }

    // Bump version based on command-line arguments.
    if (cli.flags.major || cli.flags.commitMessage.includes(cli.flags.majorTag)) {
        currentVersion.inc('major');
        logInfo('Performing a major version bump.');
    } else if (cli.flags.minor || cli.flags.commitMessage.includes(cli.flags.minorTag)) {
        currentVersion.inc('minor');
        logInfo('Performing a minor version bump.');
    } else if (cli.flags.patch || cli.flags.commitMessage.includes(cli.flags.patchTag)) {
        currentVersion.inc('patch');
        logInfo('Performing a patch version bump.');
    }

    // Prerelease and build versions can be bumped independently.
    if (cli.flags.prerelease || cli.flags.commitMessage.includes(cli.flags.prereleaseTag)) {
        currentVersion.inc('prerelease', cli.flags.prereleaseToken);
        logInfo('Performing a prerelease version bump.');
    }
    if (cli.flags.build || cli.flags.commitMessage.includes(cli.flags.buildTag)) {
        currentVersion.inc('build', cli.flags.buildToken);
        logInfo('Performing a build version bump.');
    }

    // Log version bump.
    console.log(`${packageData.version} -> ${currentVersion.toString()}`);

    // If dry flag not provided, write new version to package.json file.
    if (!cli.flags.dry) {
        packageData.version = currentVersion.toString();
        await writeFileText(PACKAGE_JSON_PATH, JSON.stringify(packageData, null, 2));
        logInfo('Version change was written to disk.');
    } else {
        logInfo('Version change was not written to disk because the --dry flag was passed.');
    }
})();
