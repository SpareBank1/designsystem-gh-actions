import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages, publishChangedPackages } from './lib/lerna';
import * as core from '@actions/core';

const action = core.getInput('action', { required: true});

switch(action){
    case 'lerna-changed':
        core.setOutput('changed', JSON.stringify(getChangedPackages()))
        break;

    case 'lerna-publish':
        core.setOutput('publish_status', JSON.stringify(publishChangedPackages()))
        break;

    case 'slack-error':
        let pubStatus = core.getInput('publish_status')
        console.log(pubStatus);
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
