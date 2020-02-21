import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages, publishChangedPackages } from './lib/lerna';
import * as core from '@actions/core';

const action = core.getInput('action', { required: true});

switch(action){
    case 'lerna-changed':
        console.log('lerna changed');
        break;

    case 'lerna-publish':
        console.log('run publish action');
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
