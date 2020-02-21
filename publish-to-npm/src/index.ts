import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages, publishChangedPackages } from './lib/lerna';
import * as core from '@actions/core';

const action = core.getInput('action', { required: true});

switch(action){
    case 'lerna-changed':
        const changedPackages = getChangedPackages();
        core.setOutput('changed_packages', JSON.stringify(changedPackages));
        core.setOutput('has_changes', changedPackages.length > 0 ? 'true': 'false');
        break;

    case 'lerna-publish':
        const publish = publishChangedPackages();
        core.setOutput('publish_failed', `${publish.success}`)
        core.setOutput('publish_error_log', publish.error);
        break;

    case 'slack-error':
        let errorMessage = core.getInput('error_message');
        let errorDetails = core.getInput('error_details');
        createErrorMessage(errorMessage, errorDetails);
        break;

    default:
        console.log('unknown param');
        break;
}

// const packages = getChangedPackages();

// if(packages && packages.length > 0){
    
//     const publish = publishChangedPackages();

//     if(publish.success){
//         postSlackMessage(
//             createChangelogMessage(packages)
//             // @to-do: merge 
//         );
//     } else {
//         postSlackMessage(
//             createErrorMessage(
//                 `:boom: An error occured during publishing to NPM.`,
//                 publish.error,
//             )
//         );
//     }

// }
