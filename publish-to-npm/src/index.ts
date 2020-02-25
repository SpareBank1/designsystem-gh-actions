import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages, publishChangedPackages } from './lib/lerna';
import * as core from '@actions/core';

const action = core.getInput('action', { required: true});

switch(action){
    case 'lerna-changed':
        const changedPackages = getChangedPackages();
        core.setOutput('changed_packages', JSON.stringify(changedPackages));
        core.setOutput('has_changes', (changedPackages && changedPackages.length > 0) ? 'true': 'false');
        break;

    case 'lerna-publish':
        const publish = publishChangedPackages();
        core.setOutput('publish_failed', `${publish.failed}`)
        core.setOutput('publish_error_log', publish.error);
        break;

    case 'slack-error':
        let errorMessage = core.getInput('error_message');
        let errorDetails = core.getInput('error_details');
        postSlackMessage(createErrorMessage(errorMessage, errorDetails))
        break;

    case 'slack-success':
        let successMessage = core.getInput('success_message');
        let packages = core.getInput('changed_packages');
        postSlackMessage(createChangelogMessage(JSON.parse(packages)));
        break;

    default:
        console.log('unknown param');
        break;
}

